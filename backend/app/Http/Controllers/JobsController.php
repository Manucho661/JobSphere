<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

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
        $user = Job::create($validated);

        return response()->json([
            'message' => 'User created successfully!',
            'data' => $user,
        ]);
    }
}
