<?php

namespace Jkli\Cms\Actions;

use Jkli\Cms\Http\Requests\CreatePageRequest;
use Jkli\Cms\Models\Node;
use Jkli\Cms\Models\Page;

class CreatePageAcion
{

    public function __construct(protected CreatePageRequest $request) {}

    /**
     * Creates a new Page
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function handle()
    {
        $rootNode = new Node();
        $rootNode->type = "root";
        $rootNode->save();

        $page = Page::create(
            array_merge(
                $this->request->validated(),
                ['node_id' => $rootNode->id]
        ));

        return $page;
    }
}
