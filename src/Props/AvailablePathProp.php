<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Http\Resources\CmsObject\CmsObjectResource;
use Jkli\Cms\Http\Resources\NodeResource;
use Jkli\Cms\Http\Resources\PagePathCheckResource;
use Jkli\Cms\Http\Resources\PageResource;
use Jkli\Cms\Models\CmsNode;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Services\PagePathService;

class AvailablePathProp extends Prop
{

    protected ?string $pagePath;
    protected ?string $parentPage;
    protected bool $useParentPath;

    function __construct(
        protected Request $request
    ) {
        $base = config('cms.cms_param_base', '_cms');
        $this->pagePath = $this->request->input($base.'_pps.path');
        $this->parentPage = $this->request->input($base.'_pps.parent');
        $this->useParentPath = $this->request->input($base.'_pps.use_parent_path', true);
    }

    public function handle(Collection $props, Closure $next)
    {
        $props->put('availablePathData', Inertia::lazy(fn() => PagePathCheckResource::make($this->pathCheck())));
        
        return $next($props);
    }

    public function pathCheck()
    {
        if(!$this->pagePath) {
            return null;
        }
        $page = new Page();
        $page->path = $this->pagePath;
        $page->use_parent_path = $this->useParentPath;
        if($this->parentPage) {
            $page->parent = Page::findOrFail($this->parentPage);
            $page->parent_id = $page->parent->id;
        }
        $service = new PagePathService();
        $path = $service->getPagePath($page);
        $is_available = $service->preUpdateCheck($page);
   
        return (object)compact("path", "is_available");
    }
    
}
