<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\PageController;

Route::get('/{path?}', [PageController::class, "edit"])
    ->where('path', '.*')
    ->name('pages.edit');