<?php

namespace App\Http\Controllers;

use App\Models\JobListing;
use App\Models\SavedJob;
use Illuminate\Http\Request;

class SavedJobController extends Controller
{
    // Get all saved jobs for the logged-in user
    public function index(Request $request)
    {
        $user = $request->user(); // authenticated user

        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        $savedJobs = SavedJob::with(['job_listing.qualifications', 'job_listing.responsibilities', 'job_listing.employer'])
            ->where('user_id', $user->id)
            ->get();


        return response()->json([
            'success' => true,
            'saved_jobs' => $savedJobs
        ]);
    }

    // save job
    public function store(Request $request)
    {
        $request->validate([
            'job_listing_id' => 'required|exists:job_listings,id',
        ]);

        $saved = SavedJob::firstOrCreate([
            'user_id' => $request->user()->id,
            'job_listing_id' => $request->job_listing_id,
        ]);

        return response()->json([
            'success' => true,
            'saved' => $saved,
        ]);
    }

    public function destroy(JobListing $job, Request $request)
    {
        $deleted = SavedJob::where('user_id', $request->user()->id)
            ->where('job_listing_id', $job->id)
            ->delete();

        return response()->json([
            'success' => (bool) $deleted
        ]);
    }
}
