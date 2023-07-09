<?php

namespace Jkli\Cms\Actions\CmsNode;

use Jkli\Cms\CmsObject;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Models\CmsNode;

class GetNodeObjectAction
{

    public function handle(string $nodeId): CmsObject
    {
        $node = CmsNode::findOrFail($nodeId);
        $class = Cms::getCmsObject($node->type);
        return new $class($node);
    }

    
}
