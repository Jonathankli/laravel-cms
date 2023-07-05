<?php

namespace Jkli\Cms;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use ReflectionClass;

abstract class Module
{
    protected static string $type;

    protected static string $name;

    protected static string $slug;

    /**
     * Get the route file path
     *
     * @return string
     */
    protected static function getRoutsFile(): string
    {
        $reflector = new ReflectionClass(get_called_class());
        $fn = $reflector->getFileName();
        return dirname($fn) . '/../../routes/modules/' . static::type() . '.php';
    }

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
            ->prefix(config('cms.admin_path').'/'.static::type())
            ->group(static::getRoutsFile());
    }

    /**
     * -------------- STATIC GETTER --------------
     */

    /**
     * Get the slug of the module
     * 
     * @return string $name 
     */
    public static function slug(): string
    {
        if(isset(static::$slug)) {
            return static::$slug;
        }
        $reflect = new \ReflectionClass(get_called_class());
        return Str::of($reflect->getShortName())->snake();
    }

    /**
     * Get the type of the setting
     * 
     * @return string $name 
     */
    public static function type(): string
    {
        if(isset(static::$type)) {
            return static::$type;
        }
        $reflect = new \ReflectionClass(get_called_class());
        return Str::of($reflect->getShortName())->snake();
    }

    /**
     * Get the value of name
     * 
     * @return string $name 
     */ 
    public static function name(): string
    {
        return static::$name;
    }

    /**
     * Get the value of name
     * 
     * @return string $name 
     */ 
    public static function view(string $view): string
    {
        return static::type().'::'.$view;
    }

}
