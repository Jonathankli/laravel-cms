<?php

namespace Jkli\Cms\Services;

use Illuminate\Support\Collection;
use Jkli\Cms\CmsObject;
use Jkli\Cms\Contracts\HasModels;
use Jkli\Cms\Setting;

class HasModelService
{
    protected static Collection $models;

    static public function resolveModels(Collection $nodes): void
    {
        $models = $nodes->reduce(function($carry, $node) {
            $object = $node->getObjectInstance();
            if(!$object || !$object instanceof CmsObject) {
                return $carry;
            }

            collect($object->settings())->each(function($setting) use ($node, &$carry) {
                if(!$setting instanceof HasModels || !$setting instanceof Setting) {
                    return;
                }

                $ids = $setting->getModelIds($node);
                if(!$ids || ($ids instanceof Collection && $ids->isEmpty())) {
                    return;
                }

                $carry = $carry->mergeRecursive([
                    $setting->getModelType() => $setting->getModelIds($node)
                ]);
            });

            return $carry;
        }, collect());

        $models = $models->map(fn($ids, $model) => $model::findMany($ids)->keyBy((new $model)->getKeyName()));

        if(!isset(static::$models)) {
            static::$models = $models;
        } else {
            static::$models = static::$models->mergeRecursive($models);
        }
    }

    static public function getModels(): Collection
    {
        return static::$models ?? collect();
    }

}
