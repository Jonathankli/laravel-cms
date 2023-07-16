<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Jkli\Cms\Actions\Node\CreateNodeAction;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Http\Requests\UpdateNodeRequest;
use Jkli\Cms\Http\Resources\NodeResource;
use Jkli\Cms\Models\CmsNode;

class NodeController extends Controller
{

    public function redirectToParent(CmsNode $node)
    {
        $shell = $node->rootAncestor->shell;
        if($shell) {
            return Redirect::route("shells.edit", ["shell" => $shell->id]);
        }
        $path = ltrim($node->rootAncestor->page->full_path, "/");
        return Redirect::route("pages.edit", ["path" => $path]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Jkli\Cms\Actions\Node\CreateNodeAction  $action
     * @return \Illuminate\Http\Response
     */
    public function store(CreateNodeAction $action)
    {
        $node = $action->handle();
        Session::put("lcms.created_node", NodeResource::make($node));
        return $this->redirectToParent($node);
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
        $node = CmsNode::findOrFail($id);
        $node->settings = $request->input("settings");
        $node->save();
        Session::put("lcms.updated_node", NodeResource::make($node));
        return $this->redirectToParent($node);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        CmsNode::destroy($id);
        return Redirect::back();
    }
}
