<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class PublishedShell extends Model
{

    use HasUuids;

    protected $fillable = [
        'id',
        'node_id',
        'name'
    ];

    public function pages()
    {
        return $this->hasMany(PublishedPage::class);
    }

    public function rootNode()
    {
        return $this->belongsTo(PublishedNode::class, 'node_id');
    }

    public function nodes()
    {
        return $this->rootNode->descendantsAndSelf;
    }
}
