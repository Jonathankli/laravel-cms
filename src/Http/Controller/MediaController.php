<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Jkli\Cms\Http\Requests\ResourceFilterRequest;
use Jkli\Cms\Http\Resources\MediaResource;
use Jkli\Cms\Models\Media;
use Jkli\Cms\Modules\MediaManager;
use Jkli\Cms\Props\MediaTreeProp;
use Jkli\Cms\Services\PropsPipelineService;
use Spatie\Image\Image;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ResourceFilterRequest $request)
    {
        $media = Media::filter();
        return Inertia::render(MediaManager::view('Index'), PropsPipelineService::run([
            MediaTreeProp::class,
        ], [
            'media' => $media
        ]));
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
            'createMedia' => true,
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
        if(!$request->hasFile('file')) {
            throw new \Exception('No file uploaded');
        }

        $file = $request->file('file');

        $media = new Media();
        $media->name = $request->input('name', $file->getClientOriginalName());
        $media->file_name = $file->getClientOriginalName();
        $media->mime_type = $file->getMimeType();
        $media->copy = $request->input('copy');
        $media->description = $request->input('description');
        $media->alt = $request->input('alt');
        $media->title = $request->input('title');
        $media->save();

        $file->storeAs($media->id, $media->file_name, config('cms.media.disk', 'cms_media'));

        $storagePath = config('cms.media.storage_path', 'app/media/');

        $path = storage_path($storagePath . $media->id . '/' . $media->file_name);

        if($request->input('optimize', false)) {
            Image::load($path)
                ->optimize()
                ->save($path);
        }

        if(str_starts_with($file->getMimeType(), 'image')) {
            Image::load($path)
                ->width(150)
                ->height(150)
                ->save(storage_path($storagePath . $media->id . '/thumb_' . $media->file_name));
        }

        return Redirect::route('media.show', [ 'media' => $media->id ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  Media  $media
     * @return \Illuminate\Http\Response
     */
    public function show(Media $media)
    {
        return Inertia::render(MediaManager::view('Index'), PropsPipelineService::run([
            MediaTreeProp::class,
        ], [
            'media' => MediaResource::make($media),
        ]));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Media $media
     * @return \Illuminate\Http\Response
     */
    public function edit(Media $media)
    {
        return Inertia::render(MediaManager::view('Index'), PropsPipelineService::run([
            MediaTreeProp::class,
        ], [
            'media' => MediaResource::make($media),
            'editMedia' => true,
        ]));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Media $media
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Media $media)
    {
        if($request->file('file')) {
            $file = $request->file('file');
            $media->file_name = $file->getClientOriginalName();
            $media->mime_type = $file->getMimeType();
        }
        $media->name = $request->input('name', $media->name);
        $media->copy = $request->input('copy', $media->copy);
        $media->description = $request->input('description', $media->description);
        $media->alt = $request->input('alt', $media->alt);
        $media->title = $request->input('title', $media->title);
        $media->save();

        return Redirect::route('media.show', [ 'media' => $media->id ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Media $media
     * @return \Illuminate\Http\Response
     */
    public function destroy(Media $media)
    {
        $media->delete();
        return Redirect::route('media.index');
    }
}
