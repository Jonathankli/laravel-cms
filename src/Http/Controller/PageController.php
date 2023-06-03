<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Jkli\Cms\Actions\CreatePageAcion;
use Jkli\Cms\Actions\ShowPageAcion;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Http\Resources\NodeResource;
use Jkli\Cms\Http\Resources\PageResource;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Services\CmsPagePropsService;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render("Navi/Show", [
            'pages' => Page::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreatePageAcion $action)
    {
        $page = $action->handle();
        return Redirect::route("page.show", ["path" => ltrim($page->full_path, "/")]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ShowPageAcion $action, CmsPagePropsService $propsService)
    {
        $page = $action->handle();

        return Inertia::render("Page/Show", [
            "page" => PageResource::make($page),
            "nodes" => fn () => NodeResource::collection($page->nodes()->get())->all(),
            ...$propsService->getPageProps(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
