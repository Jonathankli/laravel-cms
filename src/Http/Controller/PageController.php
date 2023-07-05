<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Jkli\Cms\Actions\CreatePageAcion;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Http\Requests\EditPageRequest;
use Jkli\Cms\Http\Requests\ShowPageRequest;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Modules\Editor;
use Jkli\Cms\Props\AvailablePathProp;
use Jkli\Cms\Props\CmsEditModeProp;
use Jkli\Cms\Props\CmsObjectSettingsProp;
use Jkli\Cms\Props\EditNodeProp;
use Jkli\Cms\Props\GroupedCmsObjectsProp;
use Jkli\Cms\Props\ObjectSettingsProp;
use Jkli\Cms\Props\PageProp;
use Jkli\Cms\Props\PagesProp;
use Jkli\Cms\Props\ShellsProp;
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
        return Redirect::route("pages.edit", ["path" => ltrim($page->full_path, "/")]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(EditPageRequest $request)
    {
        return Inertia::render(Editor::view("Show"), PropsPipelineService::run([
            PageProp::class,
            AvailablePathProp::class,
            PagesProp::class,
            ShellsProp::class,
        ]));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(ShowPageRequest $request)
    {
        return Inertia::render(Editor::view("Edit"), PropsPipelineService::run([
            PageProp::class,
            EditNodeProp::class,
            AvailablePathProp::class,
            CmsObjectSettingsProp::class,
            GroupedCmsObjectsProp::class,
            ObjectSettingsProp::class,
            PagesProp::class,
            CmsEditModeProp::class,
            ShellsProp::class,
        ]));
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
