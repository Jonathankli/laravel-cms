<?php

namespace Jkli\Cms\Actions\Node;

use Jkli\Cms\CmsObject;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Models\Node;

class GetNodeObjectAction
{

    public function handle(string $nodeId): CmsObject
    {
        $node = Node::findOrFail($nodeId);
        $class = Cms::getCmsObject($node->type);
        return new $class($node);
    }

    
}
