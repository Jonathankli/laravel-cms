<?php

namespace Jkli\Cms\Publisher;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Collection;
use Jkli\Cms\Contracts\Publishable;

class EloquentResolver implements Resolver
{   
    public function resolve(Publishable $model, string $method): Publishable | Collection | null
    {
        return $model->$method()->get();
    }

    public function ignoreKeys(Publishable $model, string $method): Collection
    {
        $instance = $model->$method();
        if($instance instanceof BelongsTo) {
            return collect([$instance->getForeignKeyName()]);
        }
        if($instance instanceof MorphTo) {
            return collect([$instance->getForeignKeyName(), $instance->getMorphType()]);
        }
        return collect();
    }
    
    public function timing(Publishable $model, string $method, Publishable | Collection | null $resolved): PublishTimingEnum
    {
        $instance = $model->$method();
        //Has One
        if($instance instanceof HasOne) {
            return PublishTimingEnum::AFTER;
        }
        //Has Many
        if($instance instanceof HasMany) {
            return PublishTimingEnum::AFTER;
        }
        if($instance instanceof BelongsTo) {
            return PublishTimingEnum::BEFORE;
        }
        //Many To Many
        if($instance instanceof BelongsToMany) {
            return PublishTimingEnum::BEFORE;
        }

        //Morph
        if($instance instanceof MorphTo) {
            return PublishTimingEnum::AFTER;
        }
        if($instance instanceof MorphOne) {
            return PublishTimingEnum::BEFORE;
        }
        if($instance instanceof MorphMany) {
            return PublishTimingEnum::BEFORE;
        }
        // if($instance instanceof MorphPivot) {
        //     return PublishTimingEnum::BEFORE;
        // }
        // if($instance instanceof MorphToMany) {
        //     return PublishTimingEnum::BEFORE;
        // }
        // if($instance instanceof MorphOneOrMany) {
        //     return PublishTimingEnum::BEFORE;
        // }

        return PublishTimingEnum::BEFORE;
    }
}
