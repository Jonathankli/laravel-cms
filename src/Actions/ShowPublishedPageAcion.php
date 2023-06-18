<?php

namespace Jkli\Cms\Actions;

use Illuminate\Http\Request;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Models\PublishedPage;

class ShowPublishedPageAcion
{

    public function __construct(protected Request $request) {}

    /**
     * Creates a new Page
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function handle(?string $path = null): PublishedPage
    {
        if(!$path) {
            $path = $this->request->route('path');
            $path = rtrim($path, "/");
        }

        $path = "/".$path;
        
        $page = PublishedPage::where('full_path', $path)
            ->firstOrFail(); 

        return $page;
    }
}
