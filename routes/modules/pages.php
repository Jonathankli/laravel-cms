<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\PageController;
use Jkli\Cms\Http\Controller\PageShellController;

Route::get('/', [PageController::class, "index"])
    ->name('pages.index');

Route::post('/', [PageController::class, "store"])
    ->name('pages.store');

Route::get('/create', [PageController::class, "create"])
    ->name('page.edit');

Route::get('/{page}', [PageController::class, "show"])
    ->name('page.show');

Route::delete('/{page}', [PageController::class, "destroy"])
    ->name('page.destroy');

Route::patch('/{page}', [PageController::class, "update"])
    ->name('page.store');

Route::get('/{page}/edit', [PageController::class, "edit"])
    ->name('page.edit');

Route::get('/{parent}/create', [PageController::class, "create"])
    ->name('page.parent.create');

Route::get('/{page}/shell/edit', [PageShellController::class, "edit"]);

Route::get('/{page}/shell', [PageShellController::class, "show"]);

Route::delete('/{page}/shell', [PageShellController::class, "destroy"]);