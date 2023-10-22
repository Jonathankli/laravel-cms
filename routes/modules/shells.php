<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\ShellController;

Route::get('/', [ShellController::class, "index"])
    ->name('shells.index');


Route::get('/create', [ShellController::class, "create"])
    ->name('shells.edit');

Route::get('/{shell}', [ShellController::class, "show"])
    ->name('shells.show');

Route::patch('/{shell}', [ShellController::class, "update"])
    ->name('shells.store');

Route::get('/{shell}/edit', [ShellController::class, "edit"])
    ->name('shells.edit');

Route::get('/{shell}/editor', [ShellController::class, "editor"])
    ->name('shells.editor');

Route::get('/{parent}/create', [ShellController::class, "create"])
    ->name('shells.parent.create');