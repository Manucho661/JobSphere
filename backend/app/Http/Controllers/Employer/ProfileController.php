<?php

namespace App\Http\Controllers\Employer;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateCompanyDetailsRequest;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index()
    {
        $employer = auth()->user()->employer;

        return response()->json([
            'company' => $employer,
        ]);
    }
    
    public function update(UpdateCompanyDetailsRequest $request)
    {
        $validated = $request->validated();

        // Update the employer's company details
        $employer = auth()->user()->employer;
        $employer->update($validated);

        return response()->json([
            'message' => 'Company details updated successfully!',
            'company' => $employer,
        ]);
    }
}
