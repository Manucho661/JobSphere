<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\JobListing;
use App\Models\Employer;
use App\Models\JobBenefit;
use App\Mail\JobPostedMail;
use Illuminate\Http\Request;
use App\Models\JobNotification;
use App\Models\JobQualification;
use App\Models\JobResponsibility;
use Illuminate\Support\Facades\DB;
use App\Models\JobPreferredQualification;
use App\Jobs\SendNewJobNotification;


class JobsController extends Controller
{
    // GET /api/jobs
    public function index(Request $request)
    {
        try {
            $query = JobListing::with('employer.user')->latest();

            // 1️⃣ Search by job title or description
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('job_title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            }

            // 2️⃣ Employment Type (single value)
            if ($request->filled('employmentType')) {
                $query->where('employment_type', $request->employmentType);
            }

            // 3️⃣ Work Mode / Remote (single value)
            if ($request->filled('remoteWork')) {
                $query->where('work_place', $request->remoteWork);
            }

            // 4️⃣ Experience Level (single value)
            if ($request->filled('experienceLevel')) {
                $query->where('experience_level', $request->experienceLevel);
            }

            // 5️⃣ Posted Within
            if ($request->filled('postedWithin')) {
                $timeMap = [
                    '24h' => now()->subDay(),
                    '3d'  => now()->subDays(3),
                    '7d'  => now()->subDays(7),
                    '14d' => now()->subDays(14),
                    '30d' => now()->subDays(30),
                ];

                $date = $timeMap[$request->postedWithin] ?? null;
                if ($date) {
                    $query->where('created_at', '>=', $date);
                }
            }

            // 6️⃣ Pagination
            $jobs = $query->paginate(7);

            return response()->json($jobs);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Server Error — something went wrong.',
                // 'error' => $e->getMessage(), // optional
            ], 500);
        }
    }


    public function store(Request $request)
    {
        // return response()->json([
        //     'auth_id' => Auth::id(),
        //     'user' => Auth::user(),
        // ]);

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
            'benefits' => 'required|string'
        ]);

        // Get employer record linked to current user
        $employer = Employer::where('user_id', Auth::id())->first();

        if (!$employer) {
            return response()->json(['message' => 'Unauthorized: Not an employer'], 403);
        }

        DB::beginTransaction();

        try {
            // ✅ Create job and auto-link employer_id
            $job = $employer->jobs()->create([
                'job_title' => $validated['jobTitle'],
                'employment_type' => $validated['employmentType'],
                'category' => $validated['category'],
                'experience_level' => $validated['experienceLevel'],
                'work_place' => $validated['workPlace'],
                'location' => $validated['location'],
                'description' => $validated['description'],
                'salary_min' => $validated['salaryMin'],
                'salary_max' => $validated['salaryMax'],
            ]);

            // Responsibilities
            collect(explode("\n", $validated['responsibilities']))
                ->filter()
                ->each(fn($r) => JobResponsibility::create([
                    'job_id' => $job->id,
                    'responsibility' => trim($r)
                ]));

            // Qualifications
            collect(explode("\n", $validated['requiredQualifications']))
                ->filter()
                ->each(fn($q) => JobQualification::create([
                    'job_id' => $job->id,
                    'qualification' => trim($q)
                ]));

            // Benefits
            collect(explode("\n", $validated['benefits']))
                ->filter()
                ->each(fn($b) => JobBenefit::create([
                    'job_id' => $job->id,
                    'benefit' => trim($b)
                ]));

            DB::commit();

            // Send email notifications (optional: use queue)
            // Dispatch the job to the queue
            // SendNewJobNotification::dispatch($job);

            return response()->json([
                'message' => 'Job created successfully',
                'job' => $job,
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Something went wrong while creating the job',
                'details' => $e->getMessage()
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
        $FeaturedJobs = JobListing::with('employer', 'qualifications', 'responsibilities')
            ->where('is_featured', 1)
            ->get();

        return response()->json($FeaturedJobs);
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
