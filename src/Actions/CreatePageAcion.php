<?php

namespace Jkli\Cms\Actions;

use Illuminate\Validation\ValidationException;
use Jkli\Cms\Http\Requests\CreatePageRequest;
use Jkli\Cms\Models\CmsNode;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Services\PagePathService;

class CreatePageAcion
{

    public function __construct(protected CreatePageRequest $request, protected PagePathService $pagePathService) {}

    /**
     * Creates a new Page
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Jkli\Cms\Models\Page    $page
     */
    public function handle()
    {
        $rootNode = new CmsNode();
        $rootNode->type = "root";
        $rootNode->save();

        $page = new Page();
        $page->path = $this->request->input("path");
        $page->path = $this->pagePathService->getPagePath($page);

        $page->use_parent_path = $this->request->input("use_parent_path");
        $page->node_id = $rootNode->id;
        $page->parent_id = $this->request->input("parent_id");
        $page->no_index = $this->request->input("no_index", false);
        $page->no_follow = $this->request->input("no_follow", false);
        $page->title = $this->request->input("title");
        $page->name = $this->request->input("name");
        $page->description = $this->request->input("description");

        if(!$this->pagePathService->preUpdateCheck($page)) {
            throw ValidationException::withMessages([
                'path' => ['Can not be created due to conflicts.'],
            ]);
        }

        $page->save();

        return $page;
    }
}
