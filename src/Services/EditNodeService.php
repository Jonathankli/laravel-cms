<?php

namespace Jkli\Cms\Services;

use Jkli\Cms\Models\CmsNode;

class EditNodeService
{

    static protected CmsNode $node;

    static public function getEditNode(): ?CmsNode
    {
        $base = config('cms.cms_param_base', '_cms');
        $nodeId = request()->input($base.'_enode', null);

        if(!$nodeId) {
            return null;
        }

        if(isset(self::$node)) {
            return self::$node;
        }

        self::$node = CmsNode::findOrFail($nodeId);

        $settings = request()->header('X-CMS-Node-Settings');
        $settings = json_decode($settings, true);

        if (!$settings) {
            self::$node->settings = $settings;
        }

        HasModelService::resolveModels(collect([self::$node]));

        return self::$node;
    }

}
