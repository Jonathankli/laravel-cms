<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Http\Resources\CmsObject\GroupedCmsObjectCollection;

class GroupedCmsObjectsProp extends Prop
{

    public function handle(Collection $props, Closure $next)
    {
        $props->put('groupedCmsObjects', Inertia::lazy(fn () => GroupedCmsObjectCollection::make(Cms::getCmsObjects())));
        return $next($props);
    }
}
