<?php

namespace Jkli\Cms\Http\Controller;

use Inertia\Inertia;
use Jkli\Cms\Http\Resources\Publisher\DependencyResource;
use Jkli\Cms\Http\Resources\Publisher\FlattTreeResource;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Publisher\Publisher;

class DashboardController extends Controller
{
    public function index()
    {
        $m = Page::first();
        $p = new Publisher();
        $dep = $p->getDependencyTree($m);
        $flattend = $p->flattenTree($dep);
        // dd($flattend);
        return FlattTreeResource::collection($flattend);
        // return DependencyResource::make($dep);
        // return Inertia::render('Dashboard');
    }
}