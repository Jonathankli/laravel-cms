<?php

namespace Jkli\Cms;

use Illuminate\Routing\Router;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\ServiceProvider;
use Jkli\Cms\Console\PluginMapCommand;
use Jkli\Cms\Contracts\Node;
use Jkli\Cms\Facades\Cms as CmsFacade;
use Jkli\Cms\Http\Middleware\HandleInertiaRequests;
use Jkli\Cms\Http\Middleware\HandleInertiaRequestsLive;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Models\CmsNode;
use Jkli\Cms\Models\Shell;
use Jkli\Cms\Observers\PageObserver;
use Jkli\Cms\Services\ResolveNodeService;

class CmsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     */
    public function boot(Router $router)
    {
        CmsFacade::plugin(new CmsCorePlugin());
        CmsFacade::registerPublishable([
            'page' => Page::class,
            'shell' => Shell::class,
        ]);

        $this->registerModuleRoutes();

        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'cms');
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');

        $router->middlewareGroup('cms', [
            StartSession::class,
            HandleInertiaRequests::class
        ]);

        $router->middlewareGroup('live', [
            StartSession::class,
            HandleInertiaRequestsLive::class
        ]);

        $this->registerObservers();
        
        if ($this->app->runningInConsole()) {

            $this->publishes([
                __DIR__.'/../config/config.php' => config_path('cms.php'),
            ], 'config');

            $this->commands([
                PluginMapCommand::class
            ]);
        }
        
    }

    public function registerModuleRoutes()
    {
        CmsFacade::getCmsModules()->each(function($module) {
            $module::routes();
        });
    }

    public function registerObservers()
    {
        Page::observe(PageObserver::class);
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

        $this->app->bindIf(CmsNode::class, function () {
            return (new ResolveNodeService)->resloveNode();
        });
        $this->app->bindIf(Node::class, function () {
            return (new ResolveNodeService)->resloveNode();
        });

    }
}
