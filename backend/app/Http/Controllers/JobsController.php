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
    public function index()
    {
        return response()->json(
            Job::with('employer.user') // include employer and the employer's user
                ->latest()
                ->paginate(7)
        );
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
}
