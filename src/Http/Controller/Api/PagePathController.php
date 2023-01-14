<?php

namespace Jkli\Cms\Http\Controller\Api;

use Illuminate\Http\Request;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Http\Resources\PagePathCheckResource;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Services\PagePathService;

class PagePathController extends Controller
{
    /**
     * Checks a path for a page
     *
     * @return \Illuminate\Http\Response
     */
    public function check(Request $req, PagePathService $service)
    {
        $parentPage = $req->route("parentPage");
        $page = new Page();
        $page->path = $req->input("path");
        $page->use_parent_path = $req->input("use_parent_path", true);
        if($parentPage) {
            $page->parent = Page::findOrFail($parentPage);
            $page->parent_id = $page->parent->id;
        }

        $path = $service->getPagePath($page);
        $is_available = $service->preUpdateCheck($page);

        return PagePathCheckResource::make((object)compact("path", "is_available"));        
    }

}
