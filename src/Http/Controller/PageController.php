<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Models\Node;
use Jkli\Cms\Models\Page;

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
        $nodes = Node::withRecursiveChildren(fn($q) => $q->where('id', $page->node_id))->get();
        
        Inertia::render("Page/Show", [
            $page,
            $nodes
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $page = Page::findOrFail($id);
        $nodes = Node::withRecursiveChildren(fn($q) => $q->where('id', $page->node_id))->get();

        Inertia::render("Page/Show", [
            $page,
            $nodes
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
