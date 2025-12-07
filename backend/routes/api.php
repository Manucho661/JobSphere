<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\JobNotificationController;

// Public routes
Route::get('/jobs', [JobsController::class, 'index']);  // Fetch list of jobs
Route::post('/register', [AuthController::class, 'register']);  // Register new user
Route::post('/login', [AuthController::class, 'login']);  // Login user

Route::middleware('auth:sanctum')->post('/postJobs', [JobsController::class, 'store']);
Route::middleware('auth:sanctum')->put('/updateJobs/{id}', [JobsController::class, 'update']);

Route::get('/jobs/{id}', [JobsController::class, 'show']);  // View specific job details
Route::get('/featuredJobs', [JobsController::class, 'getFeaturedJobs']);  // Get featured Jobs
Route::post('/subscribe', [JobNotificationController::class, 'subscribe']);  // Subscribe to job notifications

// Protected route, requires authentication
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();  // Return authenticated user data
});
