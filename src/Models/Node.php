<?php

namespace Jkli\Cms\Models;

class Node extends PublishedNode
{

    public function page()
    {
        return $this->hasOne(Page::class);
    }
    
    public function shell()
    {
        return $this->hasOne(Shell::class);
    }

}
