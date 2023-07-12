<?php

namespace Jkli\Cms;

use Illuminate\Database\Seeder;
use Jkli\Cms\Models\CmsNode;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Models\Shell;
use Illuminate\Support\Str;

class CmsSeeder extends Seeder
{
    public function createPage($parentId, $shellId, $depth)
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
        $name = fake()->word();
        $page = Page::create([
            "path" => "/" . Str::lower($name),
            "name" => $name,
            "title" => $name,
            "description" => fake()->text(50),
            "node_id" => $rootNode->id,
            "parentId" => $parentId,
            "shell_id" => $shellId,
        ]);

        if($depth > 0) {
            for($i = 0; $i < fake()->numberBetween(3, 10); $i++) {
                $this->createPage($page->id, $shellId, $depth - fake()->numberBetween(0, 2));
            }
        }
    }
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
        $page = Page::create([
            "path" => "/",
            "name" => "Homepage",
            "title" => "Homepage",
            "description" => "Homepage Test CMS",
            "node_id" => $rootNode->id,
            "shell_id" => $shell->id,
        ]);

        $this->createPage($page->id, $shell->id, 2);
        $this->createPage(null, $shell->id, 3);
        $this->createPage(null, $shell->id, 1);
        $this->createPage(null, $shell->id, 0);
        $this->createPage(null, $shell->id, 0);
        $this->createPage(null, $shell->id, 2);
      
    }
}
