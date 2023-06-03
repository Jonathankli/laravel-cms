<?php

namespace Jkli\Cms\Services;

use Jkli\Cms\Actions\Node\GetNodeObjectAction;
use Jkli\Cms\Http\Requests\CmsEditorRequest;
use Jkli\Cms\Http\Resources\CmsObject\CmsObjectResource;
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
        $pagePath = $this->request->input($base.'_pagepath', null);

        $props = [];

        if ($editNode) {
            $props['editNodeMeta'] = CmsObjectResource::make((new GetNodeObjectAction())->handle($editNode));
        }

        return $props;
    }

}
