<?php

namespace Jkli\Cms\Settings;

use Jkli\Cms\Contracts\HasModels;
use Jkli\Cms\Http\Resources\FolderListResource;
use Jkli\Cms\Http\Resources\MediaListResource;
use Jkli\Cms\Http\Resources\MediaResource;
use Jkli\Cms\Models\Folder;
use Jkli\Cms\Models\Media as ModelsMedia;
use Jkli\Cms\Setting;
use Jkli\Cms\Traits\InteractsWithModels;

class Media extends Setting implements HasModels
{
    use InteractsWithModels;
    
    protected string $modelType = ModelsMedia::class;
    
    protected static string $component = 'media';

    /**
     * Allows the input to communicate with the server
     *
     * @param  mixed   $payload from client
     * @return mixed   $response
     */
    public function serverData(mixed $payload)
    {
        $event = data_get($payload, "event", "search");
        if($event === "search") {
            $searchTerm = data_get($payload, "searchTerm", "");
            $media = ModelsMedia::where("name", "LIKE", "%$searchTerm%")
                ->orWhere("file_name", "LIKE", "%$searchTerm%")
                ->limit(20)
                ->get();

            return [
                'event' => 'search',
                'results' => MediaResource::collection($media)->all()
            ];
        }

        if($event === "mediatree") {
            $folders = Folder::tree()->with('media')->get();
            return [
                'event' => 'mediatree',
                'folders' => FolderListResource::collection($folders)->all(),
                'media' => MediaListResource::collection(
                    ModelsMedia::whereNull('folder_id')->get()->merge($folders->pluck('media')->flatten())
                )->all()
            ];
        }

        if($event === "mediadetail") {
            return [
                'event' => 'mediadetail',
                'mediaDetail' => MediaResource::make(
                    ModelsMedia::findOrFail(data_get($payload, "id"))
                )
            ];
        }

    }


}
