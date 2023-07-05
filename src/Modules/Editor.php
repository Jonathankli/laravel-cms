<?php

namespace Jkli\Cms\Modules;

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Module;

class Editor extends Module
{

    protected static string $name = "Editor";

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

        Route::middleware(['cms'])
            ->prefix(config('cms.cms_path'))
            ->group(static::getRoutsFile());
    }

}
