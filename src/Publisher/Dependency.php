<?php

namespace Jkli\Cms\Publisher;

use Attribute;
use Jkli\Cms\Publisher\EloquentResolver;

#[Attribute]
class Dependency
{   
    public function __construct(
        public bool $silent = false,
        public bool $optional = false,
        public $resolver = EloquentResolver::class,
        public ?PublishTimingEnum $timing = null,
        public ?int $reqursiveStop = null,
    ) { }
}
