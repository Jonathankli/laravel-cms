<?php

namespace Jkli\Cms\Modules;

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Module;

class LiveServer extends Module
{

    protected static string $name = "Live Page";

    protected static string $slug = "";

    /**
     * Register the modules's routes.
     *
     * @return void
     */
    public static function routes()
    {
        if (app()->routesAreCached()) {
            return;
        }

        Route::middleware(['live'])
            ->prefix(config('cms.live_path', '/'))
            ->group(static::getRoutsFile());
        
    }

}
