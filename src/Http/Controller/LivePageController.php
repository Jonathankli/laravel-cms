<?php

namespace Jkli\Cms\Http\Controller;

use Inertia\Inertia;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Props\LivePageProp;
use Jkli\Cms\Services\PropsPipelineService;

class LivePageController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        Cms::setLiveMode();
        return Inertia::render("Page/Show", PropsPipelineService::run([
            LivePageProp::class,
        ]));
    }

}
