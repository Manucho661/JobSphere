<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Mail\JobPostedMail;
use App\Models\JobBenefit;
use Illuminate\Http\Request;
use App\Models\JobNotification;
use App\Models\JobQualification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Models\JobPreferredQualification;
use App\Models\JobResponsibility;

class JobsController extends Controller
{
    // GET /api/jobs
    public function index()
    {
        return response()->json(Job::with('employer')->latest()->paginate(7));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'jobTitle' => 'required',
            'employmentType' => 'required',
            'category' => 'required',
            'experienceLevel' => 'required',
            'workPlace' => 'required',
            'location' => 'required',
            'description' => 'required',
            'salaryMin' => 'required|numeric',
            'salaryMax' => 'required|numeric',
            'responsibilities' => 'required',
            'requiredQualifications' => 'required|string',
            'benefits' => 'required|string'
        ]);

        DB::beginTransaction();

        try {
            // 🟢 1️⃣ Store the main job record
            $job = Job::create([
                'jobTitle' => $validated['jobTitle'],
                'employmentType' => $validated['employmentType'], // ❗ You had jobTitle here by mistake
                'category' => $validated['category'],
                'experienceLevel' => $validated['experienceLevel'],
                'workPlace' => $validated['workPlace'],
                'location' => $validated['location'],
                'description' => $validated['description'],
                'minSalary' => $validated['salaryMin'],
                'maxSalary' => $validated['salaryMax']
            ]);

            // Responsibilities
            $responsibilities= array_filter(
                array_map('trim', explode("\n", $validated['responsibilities']))
            );

            foreach ($responsibilities as $responsibility) {
                JobResponsibility::create([
                    'job_id' => $job->id,
                    'responsibility' => $responsibility
                ]);
            }
            // 🟢 2️⃣ Required Qualifications
            $requiredQualifications = array_filter(
                array_map('trim', explode("\n", $validated['requiredQualifications']))
            );

            foreach ($requiredQualifications as $qualification) {
                JobQualification::create([
                    'job_id' => $job->id,
                    'qualification' => $qualification
                ]);
            }

            // 🟢 4️⃣ Benefits
            $benefits = array_filter(
                array_map('trim', explode("\n", $validated['benefits']))
            );

            foreach ($benefits as $benefit) {
                JobBenefit::create([
                    'job_id' => $job->id,
                    'benefit' => $benefit
                ]);
            }

            DB::commit();

            // 🟢 5️⃣ Send Notification Email
            $subscribers = JobNotification::pluck('email');
            foreach ($subscribers as $email) {
                Mail::to($email)->send(new JobPostedMail($job));
            }

            return response()->json([
                'message' => 'Job created successfully',
                'job' => $job,
                'qualifications' => $requiredQualifications
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Something went wrong',
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
}
