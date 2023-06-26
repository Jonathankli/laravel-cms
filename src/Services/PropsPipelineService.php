<?php

namespace Jkli\Cms\Services;

use Illuminate\Pipeline\Pipeline;

class PropsPipelineService
{

    public static function run(array $pipes)
    {
        return app(Pipeline::class)
            ->send(collect([]))
            ->through($pipes)
            ->then(fn($res) => $res->toArray());
    }

}
