<?php

namespace Jkli\Cms\Models;

class Page extends PublishedPage
{

    /**
     * The model's attributes.
     *
     * @var array
     */
    protected $attributes = [
        "use_parent_path" => true,
    ];

    public function rootNode()
    {
        return $this->belongsTo(CmsNode::class, 'node_id');
    }

    public function shell()
    {
        return $this->belongsTo(Shell::class);
    }
}
