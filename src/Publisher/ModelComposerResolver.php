<?php

namespace Jkli\Cms\Publisher;

use Illuminate\Support\Collection;
use Jkli\Cms\Contracts\Publishable;

class ModelComposerResolver extends EloquentResolver
{   
    public function resolve(Publishable $model, string $method): Publishable | Collection | null
    {
        return $model->$method();
    }

}
