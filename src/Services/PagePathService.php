<?php

namespace Jkli\Cms\Services;

use Illuminate\Support\Collection;
use Jkli\Cms\Models\Page;

class PagePathService
{

    public function getPagePath(Page $page): string
    {
        $path = [];
        if($page->use_parent_path && $page->parent_id != null) {
            $path = explode('/', trim($page->parent->full_path, '/'));
        }
        $path = array_filter(array_merge($path, explode('/', trim($page->path, '/'))));
        $path = '/' . implode('/', $path);
        $path = preg_replace(["/[^A-Za-z0-9\/. -]/", "/ /"], ["", "-"], $path);
        if($path !== "/") {
            $path = rtrim($path, "/");
        }
        return $path;
    }

    public function preUpdateCheck(Page $page): bool
    {
        if(!$page->isDirty('path') && !$page->isDirty('use_parent_path')) {
            return true;
        }
        $updates = $this->checkRecursivePageUpdates($page);
        $duplicates = $updates->duplicates();

        if($duplicates->count()) {
            return false;
        }

        $pagesCount = Page::whereIn('full_path', $updates->values())
            ->whereNotIn('id', $updates->keys())
            ->count();

        return $pagesCount === 0;
    }

    public function checkRecursivePageUpdates(Page $page): Collection
    {
        $updates = collect();
        $newPath = $this->getPagePath($page);

        if($newPath !== $page->full_path) {
            $updates->put($page->id, $newPath);
        }
        $page->full_path = $newPath;

        foreach ($page->children as $child) {
            if(!$child->use_parent_path) {
                continue;
            }
            $child->parent = $page;
            $updates->merge(
                $this->checkRecursivePageUpdates($child)
            );
        }

        return $updates;
    }
}
