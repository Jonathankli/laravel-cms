<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\PublishShellController;
use Jkli\Cms\Http\Controller\ShellController;

Route::get('/', [ShellController::class, "index"])
    ->name('shells.index');


Route::get('/create', [ShellController::class, "create"])
    ->name('shell.edit');

Route::get('/{shell}', [ShellController::class, "show"])
    ->name('shell.show');

Route::patch('/{shell}', [ShellController::class, "update"])
    ->name('shell.store');

Route::get('/{shell}/edit', [ShellController::class, "edit"])
    ->name('shell.edit');

Route::get('/{shell}/editor', [ShellController::class, "editor"])
    ->name('shell.editor');

Route::get('/{parent}/create', [ShellController::class, "create"])
    ->name('shell.parent.create');


Route::post('/{shellId}/publish', [PublishShellController::class, "store"])
    ->name('shell.publish');