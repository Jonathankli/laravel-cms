<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Models\Page;

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
        return Redirect::route("shell.show", ["shell" => $page->shell->id]);
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
        return Redirect::route("shell.editor", ["shell" => $page->shell->id]);
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
        $page = Page::findOrFail($id);
        if(!$page->shell) {
            abort(404, "Shell not found");
        }
        $page->shell_id = null;
        $page->save();

        return Redirect::route("pages.edit", ["path" => $page->full_path]);
    }
}
