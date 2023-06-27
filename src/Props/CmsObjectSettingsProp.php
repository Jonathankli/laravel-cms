<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Support\Collection;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Http\Resources\CmsObject\StaticCmsObjectSettingResource;

class CmsObjectSettingsProp extends Prop
{

    public function handle(Collection $props, Closure $next)
    {
        $props->put('cmsObjectSettings', fn() => StaticCmsObjectSettingResource::collection(Cms::getCmsObjectSettings())->all());
        return $next($props);
    }

    
}
