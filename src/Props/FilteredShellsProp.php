<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Support\Collection;
use Jkli\Cms\Models\Shell;

class FilteredShellsProp extends Prop
{

    public function handle(Collection $props, Closure $next)
    {
        $props->put('shells', fn() => Shell::filter());
        return $next($props);
    }

}
 