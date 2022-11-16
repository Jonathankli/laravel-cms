<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasUuids;
    
    public function rootNode()
    {
        return $this->belongsTo(Node::class);
    }

    public function nodes()
    {
        return Node::recursiveChildren(Node::query(), fn($q) => $q->where('id', $this->node_id));
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
