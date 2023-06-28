<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Support\Collection;

class CmsEditModeProp extends Prop
{

    public function handle(Collection $props, Closure $next)
    {
        $props->put('cmsMode', 'edit');
        return $next($props);
    }
    
}
