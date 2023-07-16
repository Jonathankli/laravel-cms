<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Jkli\Cms\Http\Resources\PageResource;
use Jkli\Cms\Models\Page;

class PageProp extends Prop
{
    function __construct(
        protected Request $request
    ) {}

    public function handle(Collection $props, Closure $next)
    {
        $props->put('page', fn() => PageResource::make($this->getPage()));
        return $next($props);
    }

    public function getPage()
    {
        $pageId = $this->request->route('page');
        
        $page = Page::where('id', $pageId)
            ->with('parent')
            ->firstOrFail();

        return $page;
    }

}
 