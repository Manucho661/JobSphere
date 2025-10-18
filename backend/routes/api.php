<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\JobNotificationController;

Route::get('/jobs', [JobsController::class, 'index']);
Route::post('/postJobs', [JobsController::class, 'store']);
Route::post('/subscribe', [JobNotificationController::class, 'subscribe']);

Route::get('/users', function () {
    return response()->json([
        ['id' => 1, 'name' => 'Emmanuel'],
        ['id' => 2, 'name' => 'Sarah']
    ]);
});
