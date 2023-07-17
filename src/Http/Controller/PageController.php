<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Jkli\Cms\Actions\CreatePageAction;
use Jkli\Cms\Actions\UpdatePageAction;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Modules\Pages;
use Jkli\Cms\Props\AvailablePathProp;
use Jkli\Cms\Props\PageProp;
use Jkli\Cms\Props\PagesProp;
use Jkli\Cms\Services\PropsPipelineService;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render(Pages::view("Index"), PropsPipelineService::run([
            PagesProp::class,
        ]));
    }

    /**
     * Creates a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(?string $parent = null)
    {
        return Inertia::render(Pages::view("Index"), PropsPipelineService::run([
            PagesProp::class,
            AvailablePathProp::class,
        ], [
            'newPage' => true,
            'createParentId' => $parent
        ]));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreatePageAction $action)
    {
        $page = $action->handle();
        return Redirect::route("page.show", ["page" => $page->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return Inertia::render(Pages::view("Index"), PropsPipelineService::run([
            PageProp::class,
            PagesProp::class,
        ]));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        return Inertia::render(Pages::view("Index"), PropsPipelineService::run([
            PageProp::class,
            PagesProp::class,
            AvailablePathProp::class,
        ], [
            'edit' => true
        ]));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePageAction $action, string $page)
    {
        $page = $action->handle($page);
        return Redirect::back();
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
