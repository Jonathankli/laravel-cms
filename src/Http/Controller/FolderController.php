<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Jkli\Cms\Http\Requests\ResourceFilterRequest;
use Jkli\Cms\Http\Resources\FolderResource;
use Jkli\Cms\Models\Folder;
use Jkli\Cms\Modules\MediaManager;
use Jkli\Cms\Props\MediaTreeProp;
use Jkli\Cms\Services\PropsPipelineService;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ResourceFilterRequest $request)
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render(MediaManager::view('Index'), PropsPipelineService::run([
            MediaTreeProp::class,
        ], [
            'createFolder' => true,
        ]));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $folder = new Folder();
        $folder->name = $request->input('name');
        $folder->parent_id = $request->input('parent_id');
        $folder->save();
  
        return Redirect::route('media.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $folder
     * @return \Illuminate\Http\Response
     */
    public function show(string $folder)
    {
        $folder = Folder::findOrFail($folder); 
        return Inertia::render(MediaManager::view('Index'), PropsPipelineService::run([
            MediaTreeProp::class,
        ], [
            'folder' => FolderResource::make($folder),
        ]));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  string $folder
     * @return \Illuminate\Http\Response
     */
    public function edit(string $folder)
    {
        $folder = Folder::findOrFail($folder); 
        return Inertia::render(MediaManager::view('Index'), PropsPipelineService::run([
            MediaTreeProp::class,
        ], [
            'folder' => FolderResource::make($folder),
        ]));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string $folder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, string $folder)
    {
        $folder = Folder::findOrFail($folder);
        $folder->name = $request->input('name', $folder->name);
        $folder->parent_id = $request->input('parent_id', $folder->parent_id);
        $folder->save();

        return Redirect::route('media.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string $folder
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $folder)
    {
        Folder::findOrFail($folder)->delete();
        return Redirect::route('media.index');
    }
}
