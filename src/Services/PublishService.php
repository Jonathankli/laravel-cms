<?php

namespace Jkli\Cms\Services;

use Jkli\Cms\Models\CmsNode;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Models\PublishedNode;
use Jkli\Cms\Models\PublishedPage;
use Jkli\Cms\Models\PublishedShell;
use Jkli\Cms\Models\Shell;

class PublishService
{

    public function publishAll()
    {
        Shell::with(['rootNode', 'rootNode.descendants'])
            ->chunk(10, function ($pages) {
                foreach ($pages as $page) {
                    $this->publishShell($page);
                }
            });
        Page::with(['rootNode', 'rootNode.descendants'])
            ->chunk(10, function ($pages) {
                foreach ($pages as $page) {
                    $this->publishPage($page);
                }
            });
    }

    public function publishShells(array $shells)
    {
        Shell::whereIn('id', $shells)
            ->with(['rootNode', 'rootNode.descendants'])
            ->chunk(10, function ($shells) {
                foreach ($shells as $page) {
                    $this->publishShell($page);
                }
            });
    }

    public function publishShell(Shell | string $shell)
    {
        if (is_string($shell)) {
            $shell = Page::where('id', $shell)
                ->with(['rootNode', 'rootNode.descendants'])
                ->firstOrFail();
        }

        $this->publishNode($shell->rootNode);

        PublishedShell::updateOrCreate([
            'id' => $shell->id
        ], [
            'id' => $shell->id,
            'name' => $shell->name,
            'node_id' => $shell->node_id,
        ]);
        
    }

    public function publishPages(array $pages)
    {
        Page::whereIn('id', $pages)
            ->with(['rootNode', 'rootNode.descendants'])
            ->chunk(10, function ($pages) {
                foreach ($pages as $page) {
                    $this->publishPage($page);
                }
            });
    }

    public function publishPage(Page | string $page)
    {
        if (is_string($page)) {
            $page = Page::where('id', $page)
                ->with(['rootNode', 'rootNode.descendants'])
                ->firstOrFail();
        }

        if(!$page->is_active) {
            $publishedPage = PublishedPage::find($page->id);
            if(!$publishedPage) return;
            $publishedPage->rootNode->descendantsAndSelf()->delete();
            $publishedPage->delete();
            return;
        }

        $this->publishNode($page->rootNode);

        $shellId = null;
        if(PublishedShell::find($page->shell_id)) {
            $shellId = $page->shell_id;
        }

        PublishedPage::updateOrCreate([
            'id' => $page->id
        ], [
            'id' => $page->id,
            'path' => $page->path,
            'full_path' => $page->full_path,
            'name' => $page->name,
            'title' => $page->title,
            'description' => $page->description,
            'no_index' => $page->no_index,
            'no_follow' => $page->no_follow,
            'use_parent_path' => $page->use_parent_path,
            'node_id' => $page->node_id,
            'parent_id' => $page->parent_id,
            'shell_id' => $shellId,
        ]);
        
    }

    public function publishNode(CmsNode | string $node): PublishedNode
    {
        if (is_string($node)) {
            $node = CmsNode::where('id', $node)
                ->with(['descendants'])
                ->firstOrFail();
        }

        $publishedDescendantIds = PublishedNode::find($node->id)?->descendants;

        if($publishedDescendantIds) {
            $deletedNodes = $node->descendants->pluck('id')->diff($publishedDescendantIds);
            PublishedNode::destroy($deletedNodes);
        }

        $publishedNode = PublishedNode::updateOrCreate([
            'id' => $node->id
        ], [
            'id' => $node->id,
            'type' => $node->type,
            'index' => $node->index,
            'outlet' => $node->outlet,
            'parent_id' => $node->parent_id,
            'settings' => $node->settings,
        ]);

        $node->descendants->each(function ($node) {
            $this->publishNode($node);
        });

        return $publishedNode;
        
    }

}
