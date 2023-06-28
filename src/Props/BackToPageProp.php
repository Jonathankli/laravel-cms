<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Session;

class BackToPageProp extends Prop
{

    public function handle(Collection $props, Closure $next)
    {
        $props->put('backToPagePath', fn() => Session::get('backToPagePath'));
        return $next($props);
    }
    
}
