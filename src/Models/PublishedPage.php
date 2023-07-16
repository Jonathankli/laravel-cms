<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Staudenmeir\LaravelAdjacencyList\Eloquent\Traits\HasAdjacencyList;

class PublishedPage extends Model
{
    use HasUuids, HasAdjacencyList;

    protected $fillable = [
        'name',
        'title',
        'description',
        'parent_id',
        'no_index',
        'no_follow',
        'path',
        'full_path',
        'use_parent_path',
        'node_id',
        'id',
        'shell_id',
    ];
    
    public function rootNode()
    {
        return $this->belongsTo(PublishedNode::class, 'node_id');
    }

    public function nodes()
    {
        return $this->rootNode->descendantsAndSelf;
    }

    public function shell()
    {
        return $this->belongsTo(PublishedShell::class);
    }
}
