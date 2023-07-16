<?php

namespace Jkli\Cms\Actions;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Jkli\Cms\Http\Requests\UpdatePageRequest;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Services\PagePathService;

class UpdatePageAction
{

    public function __construct(
        protected UpdatePageRequest $request,
        protected PagePathService $pathService
    ) {}

    /**
     * Creates a new Page
     */
    public function handle(string $pageId): Page
    {

        $page = Page::findOrFail($pageId);

        $page->name = $this->request->input('name');
        $page->title = $this->request->input('title');
        // $page->description = $this->request->input('description');
        // $page->no_index = $this->request->input('no_index');
        // $page->no_follow = $this->request->input('no_follow');
        $page->path = $this->request->input('path');
        $page->use_parent_path = $this->request->input('use_parent_path');

        if(!$this->pathService->preUpdateCheck($page)) {
            throw ValidationException::withMessages([
                'path' => ['Can not be updatet due to conflicts.'],
            ]);
        }

        $page->save();

        return $page;
    }
}
