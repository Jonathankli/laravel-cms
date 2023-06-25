<?php

namespace Jkli\Cms\Services;

use Illuminate\Support\Collection;
use Jkli\Cms\Models\Page;

class ShellService
{

    public function nodesWithShell(Page $page): Collection
    {
        $shell = $page->shell;
        $nodes = $page->nodes()->get();
        if(!$shell) return $nodes;

        $shellNodes = $shell->nodes();
        $outletNode = $shellNodes->where('type', '=', 'outlet');
        $pageRootNode = $nodes->where('type', '=', 'root');

        $pageRootNode->parent_id = $outletNode->id;
        $pageRootNode->parent = $outletNode;

        return $shellNodes->concat($nodes);

    }

}
