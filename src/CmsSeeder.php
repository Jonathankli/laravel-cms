<?php

namespace Jkli\Cms;

use Illuminate\Database\Seeder;
use Jkli\Cms\Models\Node;
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
        $rootNode = Node::create([
            "type" => "root"
        ]);
        $sec1 = Node::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Section",
            "index" => 1,
            "parent_id" => $rootNode->id,
            'settings' => "{}",
        ]);
        Node::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Section",
            "index" => 2,
            "parent_id" => $rootNode->id,
            'settings' => "{}",
        ]);
        Node::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Text",
            "index" => 1,
            "parent_id" => $sec1->id,
            'settings' => "{}",
        ]);
        Node::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Text",
            "index" => 2,
            "parent_id" => $sec1->id,
            'settings' => "{}",
        ]);
        $shellRoot = Node::create([
            "type" => "root",
        ]);
        $shellSec = Node::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Section",
            "index" => 1,
            "parent_id" => $shellRoot->id,
            'settings' => "{}",
        ]);
        Node::create([
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

        $rootNode = Node::create([
            "type" => "root"
        ]);
        $sec1 = Node::create([
            "type" => "Jkli\CmsObjects\CmsObjects\Section",
            "index" => 1,
            "parent_id" => $rootNode->id,
            'settings' => "{}",
        ]);
        Node::create([
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
