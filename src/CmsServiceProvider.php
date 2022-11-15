<?php

namespace Jkli\Cms;

use Illuminate\Routing\Router;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\ServiceProvider;
use Jkli\Cms\Console\PluginMapCommand;
use Jkli\Cms\Http\Middleware\HandleInertiaRequests;

class CmsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     */
    public function boot(Router $router)
    {
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'cms');

        $router->middlewareGroup('cms', [
            StartSession::class,
            HandleInertiaRequests::class
        ]);

        
        if ($this->app->runningInConsole()) {

            $this->publishes([
                __DIR__.'/../config/config.php' => config_path('cms.php'),
            ], 'config');

            $this->commands([
                PluginMapCommand::class
            ]);
        }
        
    }

    /**
     * Register the application services.
     */
    public function register()
    {
        // Automatically apply the package configuration
        $this->mergeConfigFrom(__DIR__.'/../config/config.php', 'cms');

        $this->app->singleton('jkli-cms', function () {
            return new Cms;
        });

    }
}
