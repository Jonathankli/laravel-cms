<?php

namespace Jkli\Cms\Publisher;

use Illuminate\Support\Collection;
use Jkli\Cms\Contracts\Publishable;

interface Resolver
{   
    public function resolve(Publishable $model, string $method): Publishable | Collection | null;
    public function timing(Publishable $model, string $method, Publishable | Collection | null $resolved): PublishTimingEnum;
    public function ignoreKeys(Publishable $model, string $method): Collection;
}
