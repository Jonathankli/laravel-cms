<?php

namespace Jkli\Cms\Services;

use Illuminate\Pipeline\Pipeline;

class PropsPipelineService
{

    public static function run(array $pipes, array $extras = [])
    {
        return app(Pipeline::class)
            ->send(collect([]))
            ->through($pipes)
            ->then(fn($res) => $res->merge($extras)->toArray());
    }

}
