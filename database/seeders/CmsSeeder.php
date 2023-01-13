<?php

namespace Jkli\Cms\Database\Seeders;

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
        Page::create([
            "path" => "/",
            "name" => "Homepage",
            "title" => "Homepage",
            "description" => "Homepage Test CMS",
            "node_id" => $rootNode->id,
        ]);
    }
}
