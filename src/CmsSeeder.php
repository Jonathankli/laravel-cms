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
            "type" => "section",
            "outlet_index" => 1,
            "index" => 1,
            "parent_id" => $rootNode->id,
        ]);
        Node::create([
            "type" => "section",
            "outlet_index" => 1,
            "index" => 2,
            "parent_id" => $rootNode->id,
        ]);
        Node::create([
            "type" => "headline",
            "outlet_index" => 1,
            "index" => 1,
            "parent_id" => $sec1->id,
        ]);
        Node::create([
            "type" => "text",
            "outlet_index" => 1,
            "index" => 2,
            "parent_id" => $sec1->id,
        ]);
        Page::create([
            "path" => "/",
            "name" => "Homepage",
            "title" => "Homepage",
            "description" => "Homepage Test CMS",
            "node_id" => $rootNode->id,
        ]);
    }
}
