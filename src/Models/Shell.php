<?php

namespace Jkli\Cms\Models;
use Jkli\Cms\Traits\HasFilter;

class Shell extends PublishedShell
{

    use HasFilter;

    protected array $searchable = ['name'];

    public function pages()
    {
        return $this->hasMany(Page::class);
    }

    public function rootNode()
    {
        return $this->belongsTo(CmsNode::class, 'node_id');
    }
}
