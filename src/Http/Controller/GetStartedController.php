<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Support\Facades\Redirect;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Models\CmsNode;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Models\Shell;
use Jkli\Cms\Objects\PageOutlet;

class GetStartedController extends Controller
{

    public function store()
    {
        $rootNode = new CmsNode();
        $rootNode->type = "root";
        $rootNode->save();

        $pageOutlet = new CmsNode();
        $pageOutlet->type = PageOutlet::type();
        $pageOutlet->index = 0;
        $pageOutlet->parent_id = $rootNode->id;
        $pageOutlet->save();

        $shell = Shell::create([
            "name" => "Main Layout",
            "node_id" => $rootNode->id,
        ]);

        $rootNode = new CmsNode();
        $rootNode->type = "root";
        $rootNode->save();

        $page = Page::create([
            "path" => "/",
            "name" => "Homepage",
            "title" => "Homepage",
            "description" => "Homepage",
            "node_id" => $rootNode->id,
            "shell_id" => $shell->id,
        ]);

        return Redirect::route("pages.edit", ["path" => $page->full_path]);
    }

   
}
