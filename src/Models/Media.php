<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Jkli\Cms\Contracts\Publishable;
use Jkli\Cms\Traits\HasFilter;
use Jkli\Cms\Traits\IsPublishable;

class Media extends Model implements Publishable
{

    use HasUuids, IsPublishable, HasFilter;

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }

    public function fullUrl(): string
    {
        return rtrim(config('cms.media.public_path'), '/') . '/' . $this->id . '/' . $this->file_name;
    }

    public function fullTumbUrl(): string
    {
        return rtrim(config('cms.media.public_path'), '/') . '/' . $this->id . '/thumb_' . $this->file_name;
    }

}
