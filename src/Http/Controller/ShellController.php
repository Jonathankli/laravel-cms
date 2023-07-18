<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Http\Requests\Shell\CreateShellRequest;
use Jkli\Cms\Http\Requests\UpdatePageRequest;
use Jkli\Cms\Models\CmsNode;
use Jkli\Cms\Models\Shell;
use Jkli\Cms\Modules\Shells;
use Jkli\Cms\Objects\PageOutlet;
use Jkli\Cms\Props\BackToPageProp;
use Jkli\Cms\Props\CmsEditModeProp;
use Jkli\Cms\Props\CmsObjectSettingsProp;
use Jkli\Cms\Props\EditNodeProp;
use Jkli\Cms\Props\EditorShellProp;
use Jkli\Cms\Props\FilteredShellsProp;
use Jkli\Cms\Props\GroupedCmsObjectsProp;
use Jkli\Cms\Props\ObjectSettingsProp;
use Jkli\Cms\Props\ShellProp;
use Jkli\Cms\Props\ShellsProp;
use Jkli\Cms\Services\PropsPipelineService;

class ShellController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render(Shells::view("Index"), PropsPipelineService::run([
            FilteredShellsProp::class,
        ]));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateShellRequest $request)
    {
        $rootNode = new CmsNode();
        $rootNode->type = "root";
        $rootNode->save();

        $pageOutlet = new CmsNode();
        $pageOutlet->type = PageOutlet::type();
        $pageOutlet->parent_id = $rootNode->id;
        $pageOutlet->save();

        $shell = Shell::create([
            "name" => $request->input("name"),
            "node_id" => $rootNode->id,
        ]);

        return Redirect::route("shells.edit", ["shell" => $shell->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return Inertia::render(Shells::view("Index"), PropsPipelineService::run([
            ShellProp::class,
            FilteredShellsProp::class,
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
        return Inertia::render(Shells::view("Index"), PropsPipelineService::run([
            ShellProp::class,
            FilteredShellsProp::class,
        ], [
            "edit" => true
        ]));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editor()
    {
        return Inertia::render(Shells::view("Edit"), PropsPipelineService::run([
            EditorShellProp::class,
            EditNodeProp::class,
            CmsObjectSettingsProp::class,
            GroupedCmsObjectsProp::class,
            ObjectSettingsProp::class,
            CmsEditModeProp::class,
            BackToPageProp::class,
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
    public function update(UpdatePageRequest $request, $id)
    {
        $page = Shell::find($id);
        $page->update($request->validated());
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
        Shell::destroy($id);
        return Redirect::back();
    }
}
