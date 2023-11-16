<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Jkli\Cms\Modules\MediaManager;
use Jkli\Cms\Props\MediaTreeProp;
use Jkli\Cms\Services\PropsPipelineService;

class MediaManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Inertia::render(MediaManager::view('Index'), PropsPipelineService::run([
            MediaTreeProp::class,
        ]));
    }

}
