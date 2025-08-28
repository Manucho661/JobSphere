<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobsController;

Route::get('/jobs', [JobsController::class, 'index']);
Route::get('/users', function () {
    return response()->json([
        ['id' => 1, 'name' => 'Emmanuel'],
        ['id' => 2, 'name' => 'Sarah']
    ]);
});
