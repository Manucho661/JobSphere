<?php

namespace App\Http\Controllers;
use App\Services\Job\JobService;
use App\Models\Employer;

use App\Models\JobBenefit;
use App\Models\JobListing;
use App\Mail\JobPostedMail;
use Illuminate\Http\Request;
use App\Models\JobNotification;
use App\Models\JobQualification;
use App\Models\JobResponsibility;
use Illuminate\Support\Facades\DB;
use App\Jobs\SendNewJobNotification;
use Illuminate\Support\Facades\Auth;
use App\Models\JobPreferredQualification;
use App\Repositories\Contracts\JobListingRepositoryInterface;


class JobsController extends Controller
{

    public function __construct(
        private readonly JobListingRepositoryInterface $jobs,
                private readonly JobService $jobService

    ) {}
    // GET /api/jobs
    public function index(Request $request)
    {
        try {
            $jobs = $this->jobs->paginateForIndex($request, 7);
            return response()->json($jobs);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'jobTitle' => 'required|string',
        'employmentType' => 'required|string',
        'category' => 'required|string',
        'experienceLevel' => 'required|string',
        'workPlace' => 'required|string',
        'location' => 'required|string',
        'description' => 'required|string',
        'salaryMin' => 'required|numeric',
        'salaryMax' => 'required|numeric',
        'responsibilities' => 'required|string',
        'requiredQualifications' => 'required|string',
        'benefits' => 'required|string',
    ]);

    try {

        $job = $this->jobService->createJob(
            Auth::id(),
            $validated
        );

        return response()->json([
            'message' => 'Job created successfully',
            'job' => $job,
        ], 201);

    } catch (\Throwable $e) {

        return response()->json([
            'error' => $e->getMessage(),
        ], 500);
    }
}


    public function show($id)
    {
        $job = JobListing::with('employer', 'qualifications', 'responsibilities')->find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        return response()->json($job);
    }

    public function getFeaturedJobs()
    {
        $featuredJobs = JobListing::with([
            'employer',
            'qualifications',
            'responsibilities',
        ])
            ->withCount('likes')
            ->where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get();

        return response()->json($featuredJobs);
    }


    public function getEmployerJobs($employerId)
    {
        $jobs = jobListing::where('employer_id', $employerId);
        if (!$jobs) {
            return response()->json(['message' => 'No jobs found'], 404);
        }
        return response()->json($jobs);
    }

    public function update(Request $request, $id)
    {
        // Validate incoming request
        $validated = $request->validate([
            'jobTitle' => 'required|string|max:255',
            'employmentType' => 'nullable|string',
            'category' => 'nullable|string',
            'experienceLevel' => 'nullable|string',
            'workPlace' => 'nullable|string',
            'location' => 'nullable|string',
            'salaryMin' => 'nullable|numeric',
            'salaryMax' => 'nullable|numeric',
            // 'hideSalary' => 'boolean',
            'description' => 'nullable|string',

            // related table data
            'responsibilities' => 'nullable|string',
            'requiredQualifications' => 'nullable|string',
            'benefits' => 'nullable|string',
        ]);

        // Find the job
        $job = JobListing::findOrFail($id);

        // Update main job fields
        $job->update([
            'job_title' => $validated['jobTitle'],
            'employment_type' => $validated['employmentType'],
            'category' => $validated['category'],
            'experience_level' => $validated['experienceLevel'],
            'work_place' => $validated['workPlace'],
            'location' => $validated['location'],
            'salary_min' => $validated['salaryMin'],
            'salary_max' => $validated['salaryMax'],
            // 'hideSalary' => $validated['hideSalary'] ?? false,
            'description' => $validated['description'],
        ]);

        // Update responsibilities
        // if (isset($validated['responsibilities'])) {
        //     $job->responsibilities()->updateOrCreate(
        //         ['job_id' => $job->id],
        //         ['text' => $validated['responsibilities']]
        //     );
        // }

        // Update qualifications
        // if (isset($validated['requiredQualifications'])) {
        //     $job->qualifications()->updateOrCreate(
        //         ['job_id' => $job->id],
        //         ['text' => $validated['requiredQualifications']]
        //     );
        // }

        // Update benefits
        // if (isset($validated['benefits'])) {
        //     $job->benefits()->updateOrCreate(
        //         ['job_id' => $job->id],
        //         ['text' => $validated['benefits']]
        //     );
        // }

        return response()->json([
            'message' => 'Job updated successfully.',
            'updated_data' => $validated,   // ← return the data that was used to update
            'job' => $job->load('responsibilities', 'qualifications', 'benefits')
        ]);
    }
}
