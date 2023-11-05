<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Support\Collection;
use Jkli\Cms\Http\Resources\CmsObject\CmsObjectResource;
use Jkli\Cms\Http\Resources\NodeResource;
use Jkli\Cms\Services\EditNodeService;

class EditNodeProp extends Prop
{

    public function handle(Collection $props, Closure $next)
    {
        $node = EditNodeService::getEditNode();

        if($node) {
            $props->put('editNodeMeta', fn() => CmsObjectResource::make($node->getObjectInstance()));
            $props->put('editNode', fn() => NodeResource::make($node));
        }

        return $next($props);
    }

}
