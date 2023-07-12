<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\PageController;

Route::get('/', [PageController::class, "index"])
    ->name('pages.index');