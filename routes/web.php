<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\DashboardController;
use Jkli\Cms\Http\Controller\NodeController;
use Jkli\Cms\Http\Controller\PageController;
use Jkli\Cms\Http\Controller\LivePageController;
use Jkli\Cms\Http\Controller\PageShellController;
use Jkli\Cms\Http\Controller\PublishPageController;
use Jkli\Cms\Http\Controller\PublishShellController;
use Jkli\Cms\Http\Controller\ShellController;
use Jkli\Cms\Http\Controller\UserController;

Route::middleware(['cms'])->group(function () {

    //cms routes
    Route::prefix(config('cms.admin_path', '/cms/admin'))->group(function () {
        //Admindashboard
        Route::get('/', [DashboardController::class, "index"]);

        Route::get('/pages/{page}/shell/edit', [PageShellController::class, "edit"]);
        Route::get('/pages/{page}/shell', [PageShellController::class, "show"]);
        Route::delete('/pages/{page}/shell', [PageShellController::class, "destroy"]);

        Route::resource('/pages', PageController::class)
            ->only(['store']);

        Route::resource('/shells', ShellController::class)
            ->only(['show', 'edit', 'store', 'update', 'destroy']);

        Route::resource('/nodes', NodeController::class)
            ->only(['store', 'update', 'destroy']);

        Route::post('/pages/{pageId}/publish', [PublishPageController::class, "store"])
            ->name('page.publish');

        Route::post('/shells/{shellId}/publish', [PublishShellController::class, "store"])
            ->name('page.publish');
    });

});
