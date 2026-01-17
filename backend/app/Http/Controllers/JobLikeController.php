<?php

namespace App\Http\Controllers;

use App\Models\JobLike;
use App\Models\JobListing;
use Illuminate\Http\Request;

class JobLikeController extends Controller

{

    public function index(Request $request)
    {
        $user = $request->user(); // authenticated user

        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        try {
            // Get all job likes for the current user
            $likes = JobLike::with('job_listing.employer:id,companyName') // include the related job
                ->where('user_id', $user->id)
                ->get();

            return response()->json([
                'success' => true,
                'liked_jobs' => $likes
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error, could not fetch liked jobs.'
            ], 500);
        }
    }

    public function toggle(Request $request)
    {
        $request->validate([
            'job_listing_id' => 'required|exists:job_listings,id'
        ]);

        $user = $request->user();
        $jobId = $request->job_listing_id;

        $liked = JobLike::where('user_id', $user->id)
            ->where('job_listing_id', $jobId)
            ->first();

        if ($liked) {
            // Unlike
            $liked->delete();
            JobListing::where('id', $jobId)->decrement('likes');

            return response()->json([
                'liked' => false
            ]);
        }

        // Like
        JobLike::create([
            'user_id' => $user->id,
            'job_listing_id' => $jobId
        ]);

        JobListing::where('id', $jobId)->increment('likes');

        return response()->json([
            'liked' => true
        ]);
    }
}
