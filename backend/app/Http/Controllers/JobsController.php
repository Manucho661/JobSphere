<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Mail\JobPostedMail;
use Illuminate\Http\Request;
use App\Models\JobNotification;
use Illuminate\Support\Facades\Mail;

class JobsController extends Controller
{
    // GET /api/jobs
    public function index()
    {
        return response()->json(Job::with('employer')->latest()->paginate(7));
    }

    public function store(Request $request)
    {
        // Validate incoming data
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'requirements' => 'required'
        ]);

        // Create new record
        $job = Job::create($validated);

        // Send notification email
        $subscribers = JobNotification::pluck('email');
        foreach ($subscribers as $email) {
            Mail::to($email)->send(new JobPostedMail($job));
        }

        return response()->json([
            'message' => 'User created successfully!',
            'data' => $job,
        ]);
    }
}
