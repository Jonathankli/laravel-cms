<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Staudenmeir\LaravelAdjacencyList\Eloquent\HasRecursiveRelationships;

class PublishedNode extends Model
{
    use HasUuids, HasRecursiveRelationships;

    protected $casts = [
        'settings' => 'array',
    ];

    protected $fillable = [
        'settings',
        'type',
        'index',
        'parent_id',
        'outlet',
        'id',
    ];

    public function page()
    {
        return $this->hasOne(Page::class);
    }

}