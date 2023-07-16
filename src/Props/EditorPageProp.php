<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Jkli\Cms\Http\Resources\NodeResource;
use Jkli\Cms\Http\Resources\PageResource;
use Jkli\Cms\Http\Resources\ShellResource;
use Jkli\Cms\Models\Page;

class EditorPageProp extends Prop
{
    protected Page $page;

    function __construct(
        protected Request $request
    ) {}

    public function handle(Collection $props, Closure $next)
    {
        $props->put('page', fn() => PageResource::make($this->getPage()));
        if($this->getShell()) {
            $props->put('shell', fn() => ShellResource::make($this->getShell()));
        }
        $props->put('nodes', fn() => NodeResource::collection($this->getNodes())->all());
        $props->put('entityType', 'page');
        
        return $next($props);
    }

    public function getPage()
    {
        if(!isset($this->page)) {
            $path = $this->request->route('path');
            $path = rtrim($path, "/");
            $path = "/".$path;
            
            $page = Page::where('full_path', $path)
                ->firstOrFail();

            $this->page = $page;
        }

        return $this->page;
    }

    public function getShell()
    {
        return $this->getPage()->shell;
    }

    public function getNodes()
    {
        $pageNodes = $this->getPage()->nodes();
        $shellNodes = $this->getShell()?->nodes() ?? collect();
        $nodes = $shellNodes->concat($pageNodes);
        return $nodes;
    }
}
 