<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\UserController;

Route::get('/', [UserController::class, "index"])
    ->name('users.index');