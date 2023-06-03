<?php

namespace Jkli\Cms\Services;

use Jkli\Cms\Actions\Node\GetNodeObjectAction;
use Jkli\Cms\Http\Requests\CmsEditorRequest;
use Jkli\Cms\Http\Resources\CmsObject\CmsObjectResource;
use Jkli\Cms\Http\Resources\PagePathCheckResource;
use Jkli\Cms\Models\Page;

class CmsPagePropsService
{

    function __construct(
        protected CmsEditorRequest $request
    ) {}

    public function getPageProps(): array
    {
        $base = config('cms.cms_param_base', '_cms');

        $editNode = $this->request->input($base.'_enode', null);
        $pagePath = $this->request->has($base.'_pps.path');

        $props = [];

        if ($editNode) {
            $props['editNodeMeta'] = CmsObjectResource::make((new GetNodeObjectAction())->handle($editNode));
        }
        if ($pagePath) {
            $parentPage = $this->request->input($base.'_pps.parent');
            $page = new Page();
            $page->path = $this->request->input($base.'_pps.path');
            $page->use_parent_path = $this->request->input($base.'_pps.use_parent_path', true);
            if($parentPage) {
                $page->parent = Page::findOrFail($parentPage);
                $page->parent_id = $page->parent->id;
            }
            $service = new PagePathService();
            $path = $service->getPagePath($page);
            $is_available = $service->preUpdateCheck($page);
       
            $props['availablePathData'] = PagePathCheckResource::make((object)compact("path", "is_available"));
        }

        return $props;
    }

}
