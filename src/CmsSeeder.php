<?php

namespace Jkli\Cms;

use Illuminate\Database\Seeder;
use Jkli\Cms\Models\Node;
use Jkli\Cms\Models\Page;

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
        Page::create([
            "path" => "/",
            "name" => "Homepage",
            "title" => "Homepage",
            "description" => "Homepage Test CMS",
            "node_id" => $rootNode->id,
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
