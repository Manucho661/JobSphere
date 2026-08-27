<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class EmployerJobController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();
        $employer = $user->employer;

        $jobs = $employer->jobListings()
            ->withCount('likes')
            ->get();

        $totalJobs = count($jobs);

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

        $topPerformingJobs = $employer->jobListings()
            ->withCount('likes')
            ->orderByDesc('likes_count')
            ->take(3)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'jobs' => $jobs,
                'total_jobs' => $totalJobs,
                'active_jobs' => $activeJobs,
                'expired_jobs' => $expiredJobs,
                'this_week_jobs' => $thisWeekJobs,
                'top_perfoming_jobs' => $topPerformingJobs
            ]
        ]);
    }
}
