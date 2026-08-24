<?php

namespace App\Http\Controllers;

use App\Models\JobListing;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EmployerDashboardController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();

        $employer = $user->employer;

        if (!$employer) {
            return response()->json([
                'success' => false,
                'message' => 'Employer profile not found.'
            ], 404);
        }

        $jobs = $employer->jobListings();

        $totalJobs = $jobs->count();

        $activeJobs = $employer->jobListings()
            ->where('active', 1)
            ->count();

        $expiredJobs = $employer->jobListings()
            ->where('active', 0)
            ->count();

        // Jobs posted this week
        $thisWeekJobs = $employer->jobListings()
            ->whereBetween('created_at', [
                Carbon::now()->startOfWeek(),
                Carbon::now()->endOfWeek()
            ])
            ->count();

        $recentJobs = $employer->jobListings()
            ->latest()
            ->take(4)
            ->get();

        $topPerformingJobs = $employer->jobListings()
            ->withCount('likes')
            ->orderByDesc('likes_count')
            ->take(3)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_jobs' => $totalJobs,
                'active_jobs' => $activeJobs,
                'expired_jobs' => $expiredJobs,
                'this_week_jobs' => $thisWeekJobs,
                'recent_jobs' => $recentJobs,
                'top_performing_jobs' => $topPerformingJobs,
            ]
        ]);
    }
}
