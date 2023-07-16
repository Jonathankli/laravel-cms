<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\PageController;

Route::get('/', [PageController::class, "index"])
    ->name('pages.index');


Route::get('/create', [PageController::class, "create"])
    ->name('page.edit');

Route::get('/{page}/edit', [PageController::class, "edit"])
    ->name('page.edit');
