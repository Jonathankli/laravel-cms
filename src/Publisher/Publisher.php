<?php

namespace Jkli\Cms\Publisher;

use Exception;
use Illuminate\Support\Collection;
use Jkli\Cms\Contracts\Publishable;
use Jkli\Cms\Publisher\Dependency;
use ReflectionClass;

class Publisher
{

    public function publish(Publishable | DependencyDto $publishable, array | Collection $optionals = [], ?RelationDto $parentRelation = null)
    {
        if(is_array($optionals))
            $optionals = collect($optionals);
        
        if(!($publishable instanceof DependencyDto)) {
            $publishable = $this->getDependencyTree($publishable);
        }

        $key = $publishable->getKey();
        if($parentRelation?->getOptions()->optional && !$optionals->has($key)) {
            return;
        }
        
        //pre publish relations
        foreach ($publishable->getRelations() as $relation) {
            if($relation->getTiming() !== PublishTimingEnum::BEFORE) {
                continue;
            }
            $this->publishRelation($relation, $publishable, $optionals);
        }

        //publish model
        $model = $publishable->getModel();
        $key = $model->getKey();
        $publishFlag = $model->getPublishedFlag();
        $publishExcludeFields = $model->getExcludePublishAttributes();
        $publishExcludeFields[] = $publishFlag;
        $class = get_class($model);

        if($model->isPublished()) {
            throw new \Exception("Can not publish already published model");
        }

        $attributes = collect($model->attributesToArray());
        $attributes = $attributes->filter(fn($value, $key) => !in_array($key, $publishExcludeFields));

        $class::usePublished()->find($key)->update($attributes->toArray());
        $model->update([$publishFlag => true]);

        //post publish relations
        foreach ($publishable->getRelations() as $relation) {
            if($relation->getTiming() !== PublishTimingEnum::AFTER) {
                continue;
            }
            $this->publishRelation($relation, $publishable, $optionals);
        }

    }

    private function publishRelation(RelationDto $relation, DependencyDto $parent, Collection $optionals)
    {
        $key = $relation->getKey($parent);
        if($relation->getOptions()->optional && !$optionals->has($key)) {
            return;
        }

        //publish dependencies
        foreach ($relation->getDependencies() as $dependeny) {
            $this->publish($dependeny, $optionals, $relation);
        }
    }
    
    public function getDependencyTree(Publishable $publishable): DependencyDto
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
            $timing = $resolver->timing($publishable, $relation, $resolvedDependencies);

            $relDto = new RelationDto($relation, $timing, $options);

            if($resolvedDependencies instanceof Publishable) {
                $childDepDto = $this->getDependencyTree($resolvedDependencies);
                $childDepDto->setParent($depDto);
                $relDto->setDependencies(collect([$childDepDto]));
            } else if($resolvedDependencies instanceof Collection) {
                $relDto->setDependencies($resolvedDependencies->map(fn($dep) => $this->getDependencyTree($dep)->setParent($depDto)));
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
        $map->put($className, [
            ...($map->get($className, [])),
            $dto
        ]);
        foreach ($dto->getRelations() as $relation) {
            foreach($relation->getDependencies()  as $dep) {
                $map = $map->mergeRecursive($this->flattenTree($dep));
            }
        }
        return $map;
    }
 
}
