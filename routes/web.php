<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\DashboardController;
use Jkli\Cms\Http\Controller\NodeController;
use Jkli\Cms\Http\Controller\PageController;
use Jkli\Cms\Http\Controller\LivePageController;
use Jkli\Cms\Http\Controller\PublishPageController;
use Jkli\Cms\Http\Controller\ShellController;

Route::middleware(['cms'])->group(function() {

    // Route::get('/', [LiveController::class, "index"]);

    //cms routes
    Route::prefix(config('cms.cms_path', '/cms'))->group(function() {

        //administration routes
        Route::prefix('admin')->group(function() {
            //Admindashboard
            Route::get('/', [DashboardController::class, "index"]);

            Route::resource('/pages', PageController::class)
                ->only(['store']);

            Route::resource('/shells', ShellController::class)
                ->only(['show', 'edit']);
    
            Route::resource('/nodes', NodeController::class)
                ->only(['store', 'update']);
    
            Route::post('/pages/{pageId}/publish', [PublishPageController::class, "store"])
                ->name('page.publish');
        });

        Route::get('/{path?}', [PageController::class, "edit"])
            ->where('path', '.*')
            ->name('page.show');
    });

});

Route::middleware(['live'])->prefix(config('cms.live_path', '/'))->group(function() {

    Route::get('/{path?}', [LivePageController::class, "show"])
        ->where('path', '.*')
        ->name('live.page.show');

});
