<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::post('/login', [AuthController::class, 'login']);  // Login user


Route::get('/{any}', function () {
    return response()->file(public_path('index.html'));
})->where('any', '^(?!api).*$');

