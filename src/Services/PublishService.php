<?php

namespace Jkli\Cms\Services;

use Jkli\Cms\Models\Node;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Models\PublishedNode;
use Jkli\Cms\Models\PublishedPage;

class PublishService
{

    public function publishAll()
    {
        Page::with(['rootNode', 'rootNode.descendants'])
            ->chunk(10, function ($pages) {
                foreach ($pages as $page) {
                    $this->publishPage($page);
                }
            });
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
        ]);
        
    }

    public function publishNode(Node | string $node): PublishedNode
    {
        if (is_string($node)) {
            $node = Node::where('id', $node)
                ->with(['descendants'])
                ->firstOrFail();
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