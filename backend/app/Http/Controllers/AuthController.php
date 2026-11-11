<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationRequest;
use App\Models\Employer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    public function register(RegistrationRequest $request)
    {
        $validated = $request->validated();

        $user = DB::transaction(function () use ($validated) {

            // Create user
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role']
            ]);

            // Create employer details if the role is employer
            if ($validated['role'] === 'employer') {
                Employer::create([
                    'user_id' => $user->id,
                ]);
            }

            return $user;
        });

        // Return JSON response
        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user,
        ], 201);
    }


    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required', 'string'],
            ]);

            // Invalid credentials are an expected authentication failure,
            // so don't throw an exception.
            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials.'
                ], 401);
            }

            $user = Auth::user();

            $user->load('employer.jobListings');

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login successful.',
                'user' => $user,
                'token' => $token
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            throw $e;
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error. Please try again later.'
            ], 500);
        }
    }
}
