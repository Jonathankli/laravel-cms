<?php

namespace Jkli\Cms\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Http\Resources\ConfigResource;
use Jkli\Cms\Http\Resources\ModuleResource;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'cms::cms';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'config' => ConfigResource::make(null),
            'modules' => fn() => ModuleResource::collection(Cms::getCmsModules())->all(),
            'session_data' => Session::get('lcms'),
        ]);
    }
}