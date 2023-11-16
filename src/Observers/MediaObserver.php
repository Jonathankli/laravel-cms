<?php

namespace Jkli\Cms\Observers;

use Illuminate\Support\Facades\Storage;
use Jkli\Cms\Models\Media;

class MediaObserver
{

    /**
     * Listen to the Page updating event.
     *
     * @param  $model
     * @return void
     */
    public function delete(Media $media)
    {
        Storage::disk(config('cms.media-disk', 'public'))->deleteDirectory($media->id);
    }

}
