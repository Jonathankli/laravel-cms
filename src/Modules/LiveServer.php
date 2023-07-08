<?php

namespace Jkli\Cms\Modules;

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
    public static function routes() { }

    public static function getRoutePrefix()
    {
        return "/";
    }

}
