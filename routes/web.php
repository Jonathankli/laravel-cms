<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\DashboardController;
use Jkli\Cms\Http\Controller\PageController;

Route::middleware(['cms'])->group(function() {

    Route::get('/', [DashboardController::class, "index"]);
    Route::get('/cms/{path?}', [PageController::class, "show"])
        ->where('path', '.*');;

});
