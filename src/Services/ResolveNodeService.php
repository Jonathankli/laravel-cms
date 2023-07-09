<?php

namespace Jkli\Cms\Services;

use Exception;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Models\CmsNode;
use Jkli\Cms\Models\PublishedNode;
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

   public function resloveCmsNode(): CmsNode
   {
        $module = $this->getModule();
        if($module !== Editor::class) {
            throw new Exception("Can not inject live node in cms node.");
        }
        $nodeId = $this->getNodeId();
        $node = CmsNode::findOrFail($nodeId);
        return $node;
   }

   public function reslovePublishedNode(): PublishedNode
   {
        $module = $this->getModule();
        if($module !== LiveServer::class) {
            throw new Exception("Can not inject cms node in a live node.");
        }
        $nodeId = $this->getNodeId();
        $node = PublishedNode::findOrFail($nodeId);
        return $node;
   }

   public function resloveNode(): PublishedNode | CmsNode
   {
        $module = $this->getModule();
        $nodeId = $this->getNodeId();
        if($module === Editor::class) {
            $node = CmsNode::findOrFail($nodeId);
            return $node;
        }
        $node = PublishedNode::findOrFail($nodeId);
        return $node;
   }

}
