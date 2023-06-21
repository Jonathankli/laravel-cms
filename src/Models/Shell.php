<?php

namespace Jkli\Cms\Models;

class Shell extends PublishedPage
{

    public function pages()
    {
        return $this->hasMany(Page::class);
    }
}
