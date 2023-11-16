<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Jkli\Cms\Traits\HasFilter;
use Staudenmeir\LaravelAdjacencyList\Eloquent\Traits\HasAdjacencyList;

class Folder extends Model
{

    use HasUuids, HasFilter, HasAdjacencyList;

    protected $searchable = [
        'name',
    ];

    public function media(): HasMany
    {
        return $this->hasMany(Media::class);
    }

}
