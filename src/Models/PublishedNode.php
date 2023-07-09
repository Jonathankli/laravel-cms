<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Jkli\Cms\Contracts\Node;
use Staudenmeir\LaravelAdjacencyList\Eloquent\HasRecursiveRelationships;

class PublishedNode extends Model implements Node
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
        return $this->hasOne(PublishedPage::class);
    }
    
    public function shell()
    {
        return $this->hasOne(PublishedShell::class);
    }

}
