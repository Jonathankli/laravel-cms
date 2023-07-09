<?php

namespace Jkli\Cms;

use Illuminate\Database\Seeder;
use Jkli\Cms\Models\CmsNode;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Models\Shell;

class CmsSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        $rootNode = CmsNode::create([
            "type" => "root"
        ]);
        $sec1 = CmsNode::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Section",
            "index" => 1,
            "parent_id" => $rootNode->id,
            'settings' => "{}",
        ]);
        CmsNode::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Section",
            "index" => 2,
            "parent_id" => $rootNode->id,
            'settings' => "{}",
        ]);
        CmsNode::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Text",
            "index" => 1,
            "parent_id" => $sec1->id,
            'settings' => "{}",
        ]);
        CmsNode::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Text",
            "index" => 2,
            "parent_id" => $sec1->id,
            'settings' => "{}",
        ]);
        $shellRoot = CmsNode::create([
            "type" => "root",
        ]);
        $shellSec = CmsNode::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Section",
            "index" => 1,
            "parent_id" => $shellRoot->id,
            'settings' => "{}",
        ]);
        CmsNode::create([
            "type" => "pageOutlet",
            "index" => 1,
            "parent_id" => $shellSec->id,
            'settings' => "{}",
        ]);
        $shell = Shell::create([
            "name" => "Layout",
            "node_id" => $shellRoot->id,
        ]);
        Page::create([
            "path" => "/",
            "name" => "Homepage",
            "title" => "Homepage",
            "description" => "Homepage Test CMS",
            "node_id" => $rootNode->id,
            "shell_id" => $shell->id,
        ]);

        $rootNode = CmsNode::create([
            "type" => "root"
        ]);
        $sec1 = CmsNode::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Section",
            "index" => 1,
            "parent_id" => $rootNode->id,
            'settings' => "{}",
        ]);
        CmsNode::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Text",
            "index" => 1,
            "parent_id" => $sec1->id,
            'settings' => "{}",
        ]);
        Page::create([
            "path" => "test/",
            "name" => "Test",
            "title" => "Test",
            "description" => "Testseite CMS",
            "node_id" => $rootNode->id,
        ]);
    }
}
