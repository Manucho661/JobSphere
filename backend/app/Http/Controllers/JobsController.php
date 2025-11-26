<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\Job;
use App\Models\Employer;
use App\Models\JobBenefit;
use App\Mail\JobPostedMail;
use Illuminate\Http\Request;
use App\Models\JobNotification;
use App\Models\JobQualification;
use App\Models\JobResponsibility;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Models\JobPreferredQualification;

class JobsController extends Controller
{
    // GET /api/jobs
    public function index(Request $request)
    {
        $query = Job::with('employer.user')->latest();

        // 1️⃣ Search by job title or description
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // 2️⃣ Job Type (array)
        if ($request->filled('employmentType')) {
            $query->whereIn('employmentType', $request->employmentType);
        }

        // 3️⃣ Work Mode / Remote
        if ($request->filled('remoteWork')) {
            $query->whereIn('workPlace', $request->remoteWork);
        }

        // 4️⃣ Experience Level
        if ($request->filled('experienceLevel')) {
            $query->whereIn('experienceLevel', $request->experienceLevel);
        }

        // 6️⃣ Salary Range (format: "50k-75k" or "150k+")
        if ($request->filled('salaryRange')) {
            $range = $request->salaryRange;
            if ($range === '150k+') {
                $query->where('maxSalary', '>=', 150000);
            } else {
                [$min, $max] = explode('-', $range);
                // remove non-numeric characters
                $min = (int) filter_var($min, FILTER_SANITIZE_NUMBER_INT);
                $max = (int) filter_var($max, FILTER_SANITIZE_NUMBER_INT);
                $query->whereBetween('minSalary', [$min, $max]);
            }
        }

        // 7️⃣ Posted Within (format: "24h", "3d", "7d", etc.)
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

        // 8️⃣ Pagination
        $jobs = $query->paginate(7);

        return response()->json($jobs);
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
                'jobTitle' => $validated['jobTitle'],
                'employmentType' => $validated['employmentType'],
                'category' => $validated['category'],
                'experienceLevel' => $validated['experienceLevel'],
                'workPlace' => $validated['workPlace'],
                'location' => $validated['location'],
                'description' => $validated['description'],
                'minSalary' => $validated['salaryMin'],
                'maxSalary' => $validated['salaryMax'],
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
            $subscribers = JobNotification::pluck('email');
            foreach ($subscribers as $email) {
                Mail::to($email)->queue(new JobPostedMail($job));
            }

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
        $job = Job::with('employer', 'qualifications', 'responsibilities')->find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        return response()->json($job);
    }


    public function getEmployerJobs($employerId)
    {
        $jobs = job::where('employer_id', $employerId);
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
            'hideSalary' => 'boolean',
            'description' => 'nullable|string',

            // related table data
            'responsibilities' => 'nullable|string',
            'requiredQualifications' => 'nullable|string',
            'benefits' => 'nullable|string',
        ]);

        // Find the job
        $job = Job::findOrFail($id);

        // Update main job fields
        $job->update([
            'jobTitle' => $validated['jobTitle'],
            'employmentType' => $validated['employmentType'],
            'category' => $validated['category'],
            'experienceLevel' => $validated['experienceLevel'],
            'workPlace' => $validated['workPlace'],
            'location' => $validated['location'],
            'salaryMin' => $validated['salaryMin'],
            'salaryMax' => $validated['salaryMax'],
            'hideSalary' => $validated['hideSalary'] ?? false,
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
            'job' => $job->load('responsibilities', 'qualifications', 'benefits')
        ]);
    }
}
