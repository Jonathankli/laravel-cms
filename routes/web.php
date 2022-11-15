<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\DashboardController;

Route::middleware(['cms'])->group(function() {

    Route::get('/', [DashboardController::class, "index"]);

});
