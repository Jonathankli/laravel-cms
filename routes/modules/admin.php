<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\DashboardController;

Route::get('/', [DashboardController::class, "index"]);