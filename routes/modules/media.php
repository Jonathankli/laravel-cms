<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\MediaController;
use Jkli\Cms\Http\Controller\MediaManagerController;

Route::get('/', [MediaManagerController::class, "index"])
    ->name('media.index');

Route::get('/create', [MediaController::class, "create"])
    ->name('media.create');

Route::post('/', [MediaController::class, "store"])
    ->name('media.store');

Route::get('/{media}', [MediaController::class, "show"])
    ->name('media.show');

Route::get('/{media}/edit', [MediaController::class, "edit"])
    ->name('media.edit');

Route::put('/{media}', [MediaController::class, "update"])
    ->name('media.update');

Route::delete('/{media}', [MediaController::class, "destroy"])
    ->name('media.destroy');