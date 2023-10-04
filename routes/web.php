<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\EditorController;
use Jkli\Cms\Http\Controller\GetStartedController;
use Jkli\Cms\Http\Controller\NodeController;
use Jkli\Cms\Http\Controller\LivePageController;

Route::middleware(['cms'])->group(function () {

    //cms routes
    Route::prefix(config('cms.admin_path', '/cms/admin'))->group(function () {

        Route::resource('/nodes', NodeController::class)
            ->only(['store', 'update', 'destroy']);

        Route::post('/get-started', [GetStartedController::class, "store"])
            ->name('get-started.store');

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