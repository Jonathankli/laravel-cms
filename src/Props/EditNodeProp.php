<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Http\Resources\CmsObject\CmsObjectResource;
use Jkli\Cms\Http\Resources\NodeResource;
use Jkli\Cms\Models\CmsNode;

class EditNodeProp extends Prop
{

    protected ?string $editNodeId;
    protected ?CmsNode $node;

    function __construct(
        protected Request $request
    ) {
        $base = config('cms.cms_param_base', '_cms');
        $this->editNodeId = $this->request->input($base.'_enode', null);
    }

    public function handle(Collection $props, Closure $next)
    {
        if($this->editNodeId) {
            $props->put('editNodeMeta', fn() => CmsObjectResource::make($this->getEditNodeMeta()));
            $props->put('editNode', fn() => NodeResource::make($this->getEditNode()));
        }

        return $next($props);
    }

    public function getEditNode()
    {
        $settings = request()->header('X-CMS-CmsNode-Settings');
        $settings = json_decode($settings, true);
        $node = $this->getNode();
        if(!$settings) {
            $node->settings = $settings;
        }
        return $node;
    }

    public function getEditNodeMeta()
    {
        $node = $this->getNode();
        $class = Cms::getCmsObject($node->type);
        return new $class($node);
    }

    private function getNode(): CmsNode
    {
        if(!isset($this->node)) {
            $this->node = CmsNode::findOrFail($this->editNodeId);
        }
        return $this->node;
    }
}
