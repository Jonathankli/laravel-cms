<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Jkli\Cms\Http\Resources\PageResource;
use Jkli\Cms\Models\Page;

class PagesProp extends Prop
{

    public function handle(Collection $props, Closure $next)
    {
        $props->put('pages', fn() => PageResource::collection(Page::all())->all());
        return $next($props);
    }
}
