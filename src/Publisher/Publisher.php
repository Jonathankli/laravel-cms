<?php

namespace Jkli\Cms\Publisher;

use Exception;
use Illuminate\Support\Collection;
use Jkli\Cms\Contracts\Publishable;
use Jkli\Cms\Publisher\Dependency;
use ReflectionClass;

class Publisher
{

    public function publish(Publishable | DependencyDto $publishable, array | string | Collection $optionals = [])
    {
        if(is_string($optionals))
            $optionals = collect([$optionals]);
        if(is_array($optionals))
            $optionals = collect($optionals);
        
        if(!($publishable instanceof DependencyDto)) {
            $publishable = $this->getDependencyTree($publishable);
        }
        
        //pre publish relations
        foreach ($publishable->getRelations() as $relation) {
            if($relation->getTiming() !== PublishTimingEnum::BEFORE) {
                continue;
            }
            $this->publishRelation($relation, $optionals);
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
            $this->publishRelation($relation, $optionals);
        }

    }

    private function publishRelation(RelationDto $relation, Collection $optionals)
    {
        $key = $relation->getName();
        
        //check if optional
        if($relation->getOptions()->optional) {
            $continue = $optionals->some(function($opt) use ($key) {
                $segments = str_split($opt, '.');
                if(!count($segments)) {
                    throw new Exception("Option can not be empty");
                }  
                return $segments[0] === $key;
            });
            if(!$continue) {
                return;
            }
        }

        //filter relation from optionals
        $filteredOptionals = $optionals->map(function($opt) use ($key) {
            $segments = str_split($opt, '.');
            if(!count($segments)) {
                throw new Exception("Option can not be empty");
            }  
            if($segments[0] === $key) {
                unset($segemens[0]);
                return implode('.', $segments);
            }
            return null;
        });
        $filteredOptionals = $filteredOptionals->filter(fn($opt) => $opt !== null);

        //publish dependencies
        foreach ($relation->getDependencies() as $dependeny) {
            $this->publish($dependeny, $filteredOptionals);
        }
    }
    
    public function getDependencyTree(Publishable $publishable): DependencyDto
    {
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

            $dto = new RelationDto($relation, $timing, $options);

            if($resolvedDependencies instanceof Publishable) {
                $depDto = $this->getDependencyTree($resolvedDependencies);
                $dto->setDependencies(collect([$depDto]));
            } else if($resolvedDependencies instanceof Collection) {
                $dto->setDependencies($resolvedDependencies->map(fn($dep) => $this->getDependencyTree($dep)));
            } else if($resolvedDependencies === null && !$options->optional) {
                throw new \Exception("Dependency {$relation} is not optional");
            }
            $dependencies->push($dto);
        }

        $dto = new DependencyDto($publishable);
        $dto->setRelations($dependencies);
        return $dto;
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
