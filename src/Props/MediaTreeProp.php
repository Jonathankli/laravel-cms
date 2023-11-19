<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Support\Collection;
use Jkli\Cms\Http\Resources\FolderListResource;
use Jkli\Cms\Http\Resources\MediaListResource;
use Jkli\Cms\Models\Folder;
use Jkli\Cms\Models\Media;

class MediaTreeProp extends Prop
{

    protected $folders;

    public function handle(Collection $props, Closure $next)
    {
        $props->put('folders', fn() => FolderListResource::collection($this->getFolders())->all());
        $props->put('medias', fn() => MediaListResource::collection(Media::whereNull('folder_id')->get()->merge($this->getFolders()->pluck('media')->flatten()))->all());
        
        return $next($props);
    }

    protected function getFolders(): Collection
    {
        if(!isset($this->folders)) {
            $this->folders = Folder::tree()->with('media')->get();;
        }
        return $this->folders;
    }

}
 