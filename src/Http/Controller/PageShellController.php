<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Models\Shell;
use Jkli\Cms\Props\BackToPageProp;
use Jkli\Cms\Props\CmsEditModeProp;
use Jkli\Cms\Props\CmsObjectSettingsProp;
use Jkli\Cms\Props\EditNodeProp;
use Jkli\Cms\Props\GroupedCmsObjectsProp;
use Jkli\Cms\Props\ObjectSettingsProp;
use Jkli\Cms\Props\ShellProp;
use Jkli\Cms\Services\PropsPipelineService;

class PageShellController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  string  $page
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show(string $page)
    {
        $page = Page::findOrFail($page);
        if(!$page->shell) {
            abort(404, "Shell not found");
        }
        Session::put('backToPagePath', $page->full_path);
        return Redirect::route("shells.show", ["shell" => $page->shell->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $page
     * @return \Illuminate\Http\RedirectResponse
     */
    public function edit(string $page)
    {
        $page = Page::findOrFail($page);
        if(!$page->shell) {
            abort(404, "Shell not found");
        }
        Session::put('backToPagePath', $page->full_path);
        return Redirect::route("shells.edit", ["shell" => $page->shell->id]);
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
