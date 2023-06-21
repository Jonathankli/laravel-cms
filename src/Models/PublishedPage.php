<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class PublishedPage extends Model
{
    use HasUuids;

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
    ];
    
    public function rootNode()
    {
        return $this->belongsTo(PublishedNode::class, 'node_id');
    }

    public function nodes()
    {
        return $this->rootNode->descendantsAndSelf();
    }

    public function parent()
    {
        return $this->belongsTo(PublishedPage::class);
    }

    public function children()
    {
        return $this->hasMany(PublishedPage::class);
    }

    public function shell()
    {
        return $this->belongsTo(PublishedShell::class);
    }
}
