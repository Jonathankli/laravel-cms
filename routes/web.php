<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\Api\NodeObjectController;
use Jkli\Cms\Http\Controller\DashboardController;
use Jkli\Cms\Http\Controller\NodeController;
use Jkli\Cms\Http\Controller\PageController;
use Jkli\Cms\Http\Controller\Api\PagePathController;
use Jkli\Cms\Http\Controller\LivePageController;

Route::middleware(['cms'])->group(function() {

    // Route::get('/', [LiveController::class, "index"]);

    //cms routes
    Route::prefix(config('cms.cms_path', '/cms'))->group(function() {

        //administration routes
        Route::prefix('admin')->group(function() {
            //Admindashboard
            Route::get('/', [DashboardController::class, "index"]);

            Route::post('/page', [PageController::class, "store"])
                ->name('page.store');
    
            Route::resource('/nodes', NodeController::class)
                ->only(['store', 'update']);
        });

        Route::get('/{path?}', [PageController::class, "show"])
            ->where('path', '.*')
            ->name('page.show');
    });

});

Route::middleware(['live'])->prefix(config('cms.live_path', '/'))->group(function() {

    Route::get('/{path?}', [LivePageController::class, "show"])
        ->where('path', '.*')
        ->name('live.page.show');

});
