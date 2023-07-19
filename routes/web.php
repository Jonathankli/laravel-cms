<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\DashboardController;
use Jkli\Cms\Http\Controller\EditorController;
use Jkli\Cms\Http\Controller\NodeController;
use Jkli\Cms\Http\Controller\PageController;
use Jkli\Cms\Http\Controller\LivePageController;
use Jkli\Cms\Http\Controller\PageShellController;
use Jkli\Cms\Http\Controller\PublishPageController;
use Jkli\Cms\Http\Controller\PublishShellController;
use Jkli\Cms\Http\Controller\ShellController;
use Jkli\Cms\Http\Controller\TestController;
use Jkli\Cms\Http\Controller\UserController;

Route::middleware(['cms'])->group(function () {

    //cms routes
    Route::prefix(config('cms.admin_path', '/cms/admin'))->group(function () {

        Route::resource('/nodes', NodeController::class)
            ->only(['store', 'update', 'destroy']);

    });

     //cms routes
     Route::prefix(config('cms.cms_path', '/cms'))->group(function() {
        Route::get('/{path?}', [EditorController::class, "edit"])
            ->where('path', '.*')
            ->name('pages.edit');
     });

});

Route::middleware(['live'])->prefix(config('cms.live_path', '/'))->group(function() {

    Route::get('/{path?}', [LivePageController::class, "show"])
        ->where('path', '.*')
        ->name('live.pages.show');

});