<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Jkli\Cms\Http\Requests\CreateMediaRequest;
use Jkli\Cms\Http\Requests\ResourceFilterRequest;
use Jkli\Cms\Http\Requests\UpdateMediaRequest;
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
    public function store(CreateMediaRequest $request)
    {
        if(!$request->hasFile('file')) {
            throw new \Exception('No file uploaded');
        }

        $file = $request->file('file');

        $media = new Media();
        $media->name = $request->input('name', $file->getClientOriginalName());
        $media->file_name = $request->input('file_name', $file->getClientOriginalName());
        $media->mime_type = $file->getMimeType();
        $media->copy = $request->input('copy');
        $media->description = $request->input('description');
        $media->alt = $request->input('alt');
        $media->title = $request->input('title');
        $media->folder_id = $request->input('folder_id');
        $media->save();

        $storagePath = rtrim(config('cms.media.storage_path'), '/');
        
        $file->storeAs($storagePath . '/' . $media->id, $media->file_name, config('cms.media.disk', 'public'));

        $path = Storage::disk(config('cms.media.disk', 'public'))->path($storagePath . '/' . $media->id . '/' . $media->file_name);

        if($request->input('optimize', false)) {
            Image::load($path)
                ->optimize()
                ->save($path);
        }

        if(str_starts_with($file->getMimeType(), 'image')) {
            $thumbpath = Storage::disk(config('cms.media.disk', 'public'))->path($storagePath . '/' . $media->id . '/thumb_' . $media->file_name);
            Image::load($path)
                ->width(150)
                ->height(150)
                ->save($thumbpath);
        }

        return Redirect::route('media.show', [ 'media' => $media->id ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $media
     * @return \Illuminate\Http\Response
     */
    public function show(string $media)
    {
        $media = Media::findOrFail($media); 
        return Inertia::render(MediaManager::view('Index'), PropsPipelineService::run([
            MediaTreeProp::class,
        ], [
            'media' => MediaResource::make($media),
        ]));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  string $media
     * @return \Illuminate\Http\Response
     */
    public function edit(string $media)
    {
        $media = Media::findOrFail($media); 
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
     * @param  string $media
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMediaRequest $request, string $media)
    {
        $media = Media::findOrFail($media);
        $fileName = $request->input('file_name');
        
        if($request->file('file')) {
            $file = $request->file('file');
            $media->file_name = $fileName;
            $media->mime_type = $file->getMimeType();

            $storagePath = rtrim(config('cms.media.storage_path'), '/');
        
            $file->storeAs($storagePath . '/' . $media->id, $media->file_name, config('cms.media.disk', 'public'));
    
            $path = Storage::disk(config('cms.media.disk', 'public'))->path($storagePath . '/' . $media->id . '/' . $media->file_name);
    
            if($request->input('optimize', false)) {
                Image::load($path)
                    ->optimize()
                    ->save($path);
            }
    
            if(str_starts_with($file->getMimeType(), 'image')) {
                $thumbpath = Storage::disk(config('cms.media.disk', 'public'))->path($storagePath . '/' . $media->id . '/thumb_' . $media->file_name);
                Image::load($path)
                    ->width(150)
                    ->height(150)
                    ->save($thumbpath);
            }

        } else if($fileName && $fileName !== $media->file_name) {
            $mediaFolderPath = rtrim(config('cms.media.storage_path'), '/') . '/' . $media->id . '/';
            Storage::disk(config('cms.media.disk', 'public'))->move($mediaFolderPath . $media->file_name, $mediaFolderPath . $fileName);
            Storage::disk(config('cms.media.disk', 'public'))->move($mediaFolderPath . 'thumb_' . $media->file_name, $mediaFolderPath . 'thumb_' . $fileName);
            $media->file_name = $fileName;
        }
        $media->name = $request->input('name', $media->name);
        $media->copy = $request->input('copy', $media->copy);
        $media->description = $request->input('description', $media->description);
        $media->alt = $request->input('alt', $media->alt);
        $media->title = $request->input('title', $media->title);
        $media->folder_id = $request->input('folder_id', $media->folder_id);
        $media->save();

        return Redirect::route('media.index');
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
