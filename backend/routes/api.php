<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployerDashboardController;
use App\Http\Controllers\JobLikeController;
use App\Http\Controllers\JobNotificationController;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\JobSeekerController;
use App\Http\Controllers\SavedJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/jobs', [JobsController::class, 'index']);  // Fetch list of jobs
Route::post('/register', [AuthController::class, 'register']);  // Register new user
Route::post('/login', [AuthController::class, 'login']);  // Login user

// Employer dashboard
Route::middleware('auth:sanctum')->get('/employer-dashboard', [EmployerDashboardController::class, 'index']);

Route::middleware('auth:sanctum')->post('/postJobs', [JobsController::class, 'store']);
Route::middleware('auth:sanctum')->put('/updateJobs/{id}', [JobsController::class, 'update']);

Route::get('/jobs/{id}', [JobsController::class, 'show']);  // View specific job details
Route::get('/featuredJobs', [JobsController::class, 'getFeaturedJobs']);  // Get featured Jobs
Route::post('/subscribe', [JobNotificationController::class, 'subscribe']);  // Subscribe to job notifications

// Protected route, requires authentication
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();  // Return authenticated user data
});

// jobs savings
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/saved-jobs', [SavedJobController::class, 'index']);
    Route::post('/saved-jobs', [SavedJobController::class, 'store']);
    Route::delete('/saved-jobs/{id}', [SavedJobController::class, 'destroy']);
});

// job seeker routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/job-seeker-jobs', [JobSeekerController::class, 'index']);
});

// job likes
Route::middleware('auth:sanctum')->post('/job-likes/toggle', [JobLikeController::class, 'toggle']);
Route::middleware('auth:sanctum')->get('/liked-jobs', [JobLikeController::class, 'index']);
