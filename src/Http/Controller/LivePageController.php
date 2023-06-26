<?php

namespace Jkli\Cms\Http\Controller;

use Inertia\Inertia;
use Jkli\Cms\Actions\ShowPublishedPageAcion;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Http\Resources\NodeResource;
use Jkli\Cms\Http\Resources\PageResource;

class LivePageController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ShowPublishedPageAcion $action)
    {
        $page = $action->handle();
        $nodes = $page->nodes();
        return Inertia::render("Page/Show", [
            "page" => PageResource::make($page),
            "nodes" => NodeResource::collection($nodes)->all(),
        ]);
    }

}
