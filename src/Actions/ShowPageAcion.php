<?php

namespace Jkli\Cms\Actions;

use Exception;
use Illuminate\Http\Request;
use Jkli\Cms\Models\Page;

class ShowPageAcion
{

    public function __construct(protected Request $request) {}

    /**
     * Creates a new Page
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function handle(?string $path = null): Page
    {
        if(!$path) {
            $path = $this->request->route('path');
            $path = rtrim($path, "/");
        }

        if(!$path) {
            $path = "/";
        }

        $page = Page::where('full_path', $path)
            ->firstOrFail(); 

        return $page;
    }
}
