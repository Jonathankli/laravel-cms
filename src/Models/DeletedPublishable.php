<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class DeletedPublishable extends Model
{
    use HasUuids;

    public function publishable()
    {
        return $this->morphTo();
    }
}
