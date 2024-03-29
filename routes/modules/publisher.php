<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\PublishController;

Route::get('/', [PublishController::class, "dashboard"])
    ->name('publisher.index');
Route::get('/{type}', [PublishController::class, "index"]);
Route::get('/{type}/multiple', [PublishController::class, "showMultiple"]);
Route::post('/{type}/multiple', [PublishController::class, "publishMultiple"]);
Route::get('/{type}/{id}', [PublishController::class, "show"]);
Route::post('/{type}/{id}', [PublishController::class, "publish"]);