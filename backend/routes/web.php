<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::post('/login', [AuthController::class, 'login']);  // Login user



Route::get('/{any}', function () {
    return response()->file(base_path('react/index.html'));
})->where('any', '^(?!api).*$');