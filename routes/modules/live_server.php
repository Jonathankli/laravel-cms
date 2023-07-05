<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\LivePageController;

Route::get('/{path?}', [LivePageController::class, "show"])
    ->where('path', '.*')
    ->name('live.pages.show');