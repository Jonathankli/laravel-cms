<?php

namespace Jkli\Cms\Services;

use Exception;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Models\CmsNode;
use Jkli\Cms\Modules\Editor;
use Jkli\Cms\Modules\LiveServer;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class ResolveNodeService
{

   public function getNodeId(): string
   {
        $nodeId = request()->header("X-CMS-NODE-SCOPE");
        if(!$nodeId) {
            throw new Exception("CmsNode not found!");
        }
        return $nodeId;
   }

   public function getModule(): string
   {
        $moduleType = request()->header("X-CMS-MODULE-SCOPE");
        $module = Cms::getCmsModules()->get($moduleType);
        if(!$module) {
            throw new NotFoundResourceException("Module not found");
        }
        if($module !== Editor::class && $module !== LiveServer::class) {
            throw new Exception("A node can only be scoped in the editor or livserver module");
        }
        return $module;
   }

   public function resloveNode(): CmsNode
   {
        $nodeId = $this->getNodeId();
        $node = CmsNode::findOrFail($nodeId);
        return $node;
   }

}
