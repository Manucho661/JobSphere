<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobNotification;

class JobNotificationController extends Controller
{
     public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:job_notifications,email',
        ]);

        JobNotification::create($validated);

        return response()->json(['message' => 'Subscribed successfully!']);
    }
}
