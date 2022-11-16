<?php

namespace Jkli\CmsHttp\Controllers\API;

use Exception;
use Illuminate\Http\Request;
use Jkli\Cms\Models\Page;

class ShowPageAcion
{

    public function __construct(protected Request $request, protected ?string $path) {}

    /**
     * Creates a new Page
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function handle(?string $path = null)
    {
        if(!$path) {
            if($this->path) {
                $path = $this->path;
            } else {
                $path = $this->request->route('path');
            }
        }

        if(!$path) {
            throw new Exception("No page path is provided!");
        }

        $path = trim($path, "/");

        $page = Page::where('full_path', $path)
            ->firstOrFail(); 

        return $page;
    }
}
