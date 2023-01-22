<?php

namespace Jkli\Cms\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void plugin(\Jkli\Cms\Contracts\Pluginable $plugin)
 * 
 * @see \CFMmedia\BlankConnector\BlankConnector
 */
class Cms extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'jkli-cms';
    }
}
