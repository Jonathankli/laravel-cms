<?php

namespace Jkli\Cms\Models;

use Jkli\Cms\Contracts\Node;

class CmsNode extends PublishedNode implements Node
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "nodes";

    public function page()
    {
        return $this->hasOne(Page::class, 'node_id');
    }
    
    public function shell()
    {
        return $this->hasOne(Shell::class, 'node_id');
    }

}
