<?php

namespace Jkli\Cms\Models;

class Shell extends PublishedShell
{

    public function pages()
    {
        return $this->hasMany(Page::class);
    }

    public function rootNode()
    {
        return $this->belongsTo(CmsNode::class, 'node_id');
    }
}
