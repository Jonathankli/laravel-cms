<?php

namespace Jkli\Cms\Http\Controller\Api;

use Jkli\Cms\Actions\Node\GetNodeObjectAction;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Http\Resources\CmsObject\CmsObjectResource;

class NodeObjectController extends Controller
{
    /**
     * Checks a path for a page
     *
     * @return \Illuminate\Http\Response
     */
    public function show(string $nodeId, GetNodeObjectAction $action)
    {
        $object = $action->handle($nodeId);
        return CmsObjectResource::make($object);        
    }

}
