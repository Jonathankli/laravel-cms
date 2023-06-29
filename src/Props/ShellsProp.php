<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Jkli\Cms\Http\Resources\ShellResource;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Models\Shell;

class ShellsProp extends Prop
{

    public function handle(Collection $props, Closure $next)
    {
        $props->put('shells', Inertia::lazy(fn() => ShellResource::collection($this->getShells())->all()));
        return $next($props);
    }

    public function getShells()
    {
        return Shell::all();
    }

}
 