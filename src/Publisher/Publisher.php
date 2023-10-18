<?php

namespace Jkli\Cms\Publisher;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\SoftDeletes;
use Jkli\Cms\Contracts\Publishable;
use Jkli\Cms\Enums\PublishStatus;
use Jkli\Cms\Publisher\Dependency;
use ReflectionClass;

class Publisher
{
    protected array $updateFlag = [];
    protected array $deleteCms = [];
    protected array $deletePublished = [];
    protected bool $firstCall = true;

    

    public function publish(Publishable | DependencyDto $publishable, array | Collection $optionals = [], ?RelationDto $parentRelation = null, $depth = 1)
    {
        $firstCall = false;
        if($this->firstCall) {
            $this->firstCall = false;
            $firstCall = true;
        }

        if(is_array($optionals))
            $optionals = collect($optionals);
        
        if(!($publishable instanceof DependencyDto)) {
            $publishable = $this->getDependencyTree($publishable);
        }

        $key = $publishable->getKey();
        $modelClass = get_class($publishable->getModel());
        if($parentRelation?->getOptions()->optional && !($optionals->contains($key) || $optionals->contains($modelClass))) {
            return;
        }

        $ignoreKeys = collect([]);

        //pre publish relations
        foreach ($publishable->getRelations() as $relation) {
            if($relation->getTiming() !== PublishTimingEnum::BEFORE) {
                continue;
            }
            $ignore = $this->publishRelation($relation, $publishable, $optionals);
            $ignoreKeys = $ignoreKeys->merge($ignore);
        }

        //publish model
        $model = $publishable->getModel();

        if($model instanceof ModelComposer) {
            $this->deleteModels();
            $this->updateFlags();
            return;
        }

        $key = $model->getKey();
        $keyName = $model->getKeyName();
        $publishFlag = $model->getPublishStatusFlag();
        $publishExcludeFields = collect($model->getExcludePublishAttributes());
        $publishExcludeFields->add($publishFlag);
        $publishExcludeFields->add($model->getDeletedAtColumn());
        $publishExcludeFields = $publishExcludeFields->merge($ignoreKeys);

        $class = get_class($model);

        if($model->trashed()) {
            $this->deleteCms[$class][] = $key;
            if($model->getPublishStatus() !== PublishStatus::Draft) {
                $this->deletePublished[$class][] = $key;
            }
            return;
        }

        if($model->publishedMode()) {
            throw new \Exception("Can not publish already published model");
        }

        $attributes = collect($model->attributesToArray());
        $attributes = $attributes->except($publishExcludeFields);

        $class::published()
            ->updateOrCreate([$keyName => $key], $attributes->toArray());

        $this->updateFlag[$class][] = $key;

        //post publish relations
        foreach ($publishable->getRelations() as $relation) {
        if($relation->getTiming() !== PublishTimingEnum::AFTER) {
                continue;
            }
            $this->publishRelation($relation, $publishable, $optionals);
        }

        if($firstCall) {
            $this->deleteModels();
            $this->updateFlags();
            $this->firstCall = true;
        }

    }

    protected function deleteModels()
    {
        foreach ($this->deleteCms as $class => $keys) {
            $model = new $class;
            $keyName = $model->getKeyName();
            $class::whereIn($keyName, $keys)->delete();
        }
        foreach ($this->deletePublished as $class => $keys) {
            $model = new $class;
            $keyName = $model->getKeyName();
            $class::published()->whereIn($keyName, $keys)->delete();
        }
    }

    protected function updateFlags()
    {
        foreach ($this->updateFlag as $class => $keys) {
            $model = new $class;
            $keyName = $model->getKeyName();
            $publishFlag = $model->getPublishStatusFlag();
            $class::whereIn($keyName, $keys)->update([$publishFlag => PublishStatus::Published]);
        }
    }

    private function publishRelation(RelationDto $relation, DependencyDto $parent, Collection $optionals): Collection
    {
        $key = $relation->getKey($parent);
        if(!$relation->getDependencies()->count()) {
            return $relation->getIgnoreKeys();;
        }
        $modelClass = get_class($relation->getDependencies()->first()?->getModel());

        if($relation->getOptions()->optional && !($optionals->contains($key) || $optionals->contains($modelClass))) {
            return $relation->getIgnoreKeys();
        }

        //publish dependencies
        foreach ($relation->getDependencies() as $dependeny) {
            $this->publish($dependeny, $optionals, $relation, 2);
        }

        return collect();
    }
    
    public function getDependencyTree(Publishable | ModelComposer $publishable): DependencyDto
    {
        $depDto = new DependencyDto($publishable);

        $reflector = new ReflectionClass($publishable);
        $methods = $reflector->getMethods();

        $dependencies = collect();
        foreach($methods as $method) {
            $attributes = $method->getAttributes(Dependency::class);
            if(count($attributes) > 1) {
                throw new \Exception("Only one dependency attribute is allowed per method");
            }
            if(count($attributes) < 1) {
                continue;
            }
            $options = $attributes[0]->newInstance();
            $relation = $method->getName();
            $resolver = app()->make($options->resolver);
            $resolvedDependencies = $resolver->resolve($publishable, $relation);
            $ignoreKeys = $resolver->ignoreKeys($publishable, $relation);
            $timing = $resolver->timing($publishable, $relation, $resolvedDependencies);

            $relDto = new RelationDto($relation, $timing, $options);
            $relDto->setIgnoreKeys($ignoreKeys);

            if($resolvedDependencies instanceof Publishable) {
                $childDepDto = $this->getDependencyTree($resolvedDependencies);
                $childDepDto->setRelation($relDto);
                $childDepDto->setParent($depDto);
                $relDto->setDependencies(collect([$childDepDto]));
            } else if($resolvedDependencies instanceof Collection) {
                $relDto->setDependencies(
                    $resolvedDependencies->map(
                        fn($dep) => $this->getDependencyTree($dep)
                            ->setParent($depDto)
                            ->setRelation($relDto)
                        )
                    );
            } else if($resolvedDependencies === null && !$options->optional) {
                throw new \Exception("Dependency {$relation} is not optional");
            }
            $dependencies->push($relDto);
        }

        $depDto->setRelations($dependencies);
        return $depDto;
    }

    public function flattenTree(DependencyDto $dto): Collection
    {
        $map = collect([]);
        $model = $dto->getModel();
        $className = get_class($model);
        if(!$model instanceof ModelComposer) {
            $map->put($className, [$dto]);
        }
        foreach ($dto->getRelations() as $relation) {
            foreach($relation->getDependencies()  as $dep) {
                $map = $map->mergeRecursive($this->flattenTree($dep));
            }
        }
        return $map->map(function ($array) {
            return collect($array)->unique('modelKey')->all();
        });;
    }
 
}
