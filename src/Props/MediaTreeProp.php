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

    public function handle(Collection $props, Closure $next)
    {

        $props->put('media', fn() => MediaListResource::collection(Media::whereNull('folder_id')->get())->all());
        $props->put('folders', fn() => FolderListResource::collection(Folder::tree()->with('media')->get()->toTree())->all());
        
        return $next($props);
    }

}
 