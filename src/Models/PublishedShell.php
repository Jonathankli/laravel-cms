<?php

namespace Jkli\Cms\Models;

class PublishedShell extends PublishedPage
{

    public function pages()
    {
        return $this->hasMany(PublishedPage::class);
    }
}
