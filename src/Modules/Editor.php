<?php

namespace Jkli\Cms\Modules;

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
    public static function getRoutePrefix() {
        return config('cms.cms_path');
    }

    /**
     * Register the modules's routes.
     *
     * @return void
     */
    public static function routes() { }

}
