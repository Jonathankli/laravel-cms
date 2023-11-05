<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;
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
use Jkli\Cms\Props\EditorPageProp;
use Jkli\Cms\Props\PagesProp;
use Jkli\Cms\Props\SettingDataReloadProp;
use Jkli\Cms\Props\ShellsProp;
use Jkli\Cms\Services\PropsPipelineService;
use Jkli\Cms\Services\SettingsValidateService;

class EditorController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(EditPageRequest $request)
    {
        return Inertia::render(Editor::view("Show"), PropsPipelineService::run([
            EditorPageProp::class,
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
        SettingsValidateService::validateEditNodeSettings();
        try {
            return Inertia::render(Editor::view("Edit"), PropsPipelineService::run([
                EditorPageProp::class,
                EditNodeProp::class,
                AvailablePathProp::class,
                CmsObjectSettingsProp::class,
                GroupedCmsObjectsProp::class,
                ObjectSettingsProp::class,
                PagesProp::class,
                CmsEditModeProp::class,
                ShellsProp::class,
                SettingDataReloadProp::class,
            ]));
        } catch (ModelNotFoundException $e) {
            if($e->getModel() == Page::class && !Page::count()) {
                return Inertia::render(Editor::view("Intro"));
            }
        }
        return abort(404);
    }

}
