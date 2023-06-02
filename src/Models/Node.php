<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Staudenmeir\LaravelAdjacencyList\Eloquent\HasRecursiveRelationships;

class Node extends Model
{
    use HasUuids, HasRecursiveRelationships;

    protected $casts = [
        'settings' => 'array',
    ];

    protected $fillable = [
        'settings'
    ];

    public function page()
    {
        return $this->hasOne(Page::class);
    }

}
