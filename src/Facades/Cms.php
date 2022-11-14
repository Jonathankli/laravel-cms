<?php

namespace Onehub\Core\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void registerPlugin(\Onehub\Core\Plugin $plugin)
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
