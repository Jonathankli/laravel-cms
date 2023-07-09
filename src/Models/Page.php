<?php

namespace Jkli\Cms\Models;

class Page extends PublishedPage
{

    public function rootNode()
    {
        return $this->belongsTo(CmsNode::class, 'node_id');
    }

    public function parent()
    {
        return $this->belongsTo(Page::class);
    }

    public function children()
    {
        return $this->hasMany(Page::class);
    }

    public function shell()
    {
        return $this->belongsTo(Shell::class);
    }
}
