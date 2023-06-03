<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Jkli\Cms\Actions\CreatePageAcion;
use Jkli\Cms\Actions\Node\CreateNodeAction;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Http\Requests\UpdateNodeRequest;
use Jkli\Cms\Http\Resources\NodeResource;
use Jkli\Cms\Models\Node;

class NodeController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Jkli\Cms\Actions\Node\CreateNodeAction  $action
     * @return \Illuminate\Http\Response
     */
    public function store(CreateNodeAction $action)
    {
        $node = $action->handle();
        $path = ltrim($node->rootAncestor->page->full_path, "/");
        Session::put("lcms.created_node", NodeResource::make($node));
        return Redirect::route("page.show", ["path" => $path]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateNodeRequest $request, $id)
    {
        $node = Node::findOrFail($id);
        $node->settings = $request->input("settings");
        $node->save();
        $path = ltrim($node->rootAncestor->page->full_path, "/");
        Session::put("lcms.updated_node", NodeResource::make($node));
        return Redirect::route("page.show", ["path" => $path]);
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
