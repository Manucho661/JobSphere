<?php

namespace App\Http\Controllers;

use App\Models\JobListing;
use Illuminate\Http\Request;

class JobSeekerController extends Controller
{
    public function index()
    {
        try {
            $jobs = JobListing::limit(5)->get();
            return response()->json($jobs);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Server Error — something went wrong.',
            ], 500);
        }
    }
}
