<?php

namespace Jkli\Cms\Modules;

use Jkli\Cms\Module;

class Admin extends Module
{

    protected static string $name = "Dashboard";

    /**
     * Register the modules's routes.
     *
     * @return void
     */
    public static function getRoutePrefix() {
        return config('cms.admin_path');
    }

}
