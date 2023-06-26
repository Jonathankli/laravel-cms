<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Support\Collection;

abstract class Prop 
{
    abstract public function handle(Collection $props, Closure $next);
}