<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\DashboardController;
use Jkli\Cms\Http\Controller\NodeController;
use Jkli\Cms\Http\Controller\PageController;
use Jkli\Cms\Http\Controller\Api\PagePathController;

Route::middleware(['cms'])->group(function() {

    Route::get('/', [DashboardController::class, "index"]);
    Route::get('/cms/{path?}', [PageController::class, "show"])
        ->where('path', '.*')
        ->name('page.show');

    Route::post('/nodes', [NodeController::class, "store"])
        ->name('node.store');

    Route::get('/api/pagePath/check/{parentPage?}', [PagePathController::class, "check"])
        ->name('pagePath.check');

});
