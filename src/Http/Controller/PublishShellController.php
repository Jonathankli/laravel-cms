<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Support\Facades\Redirect;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Models\Shell;
use Jkli\Cms\Services\PublishService;

class PublishShellController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Jkli\Cms\Services\PublishService  $service
     * @param  string $shellId
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(PublishService $service, $shellId): \Illuminate\Http\RedirectResponse
    {
        $shell = Shell::findOrFail($shellId);
        $service->publishShell($shell);
        return Redirect::route("shells.edit", ["shell" => $shellId]);
    }

}
