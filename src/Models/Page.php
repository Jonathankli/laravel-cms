<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'title',
        'path',
        'use_parent_path',
        'node_id'
    ];
    
    public function rootNode()
    {
        return $this->belongsTo(Node::class);
    }

    public function nodes()
    {
        return Node::find($this->node_id)->descendantsAndSelf();
    }

    public function parent()
    {
        return $this->belongsTo(Page::class);
    }

    public function children()
    {
        return $this->hasMany(Page::class);
    }
}
