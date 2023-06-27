<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Support\Facades\Redirect;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Services\PublishService;

class PublishPageController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Jkli\Cms\Services\PublishService  $service
     * @param  string $pageId
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(PublishService $service, $pageId): \Illuminate\Http\RedirectResponse
    {
        $page = Page::findOrFail($pageId);
        $service->publishPage($page);
        return Redirect::route("pages.show", ["path" => ltrim($page->full_path, "/")]);
    }

}
