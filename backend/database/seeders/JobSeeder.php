<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\JobQualification;
use App\Models\JobResponsibility;
use App\Models\JobBenefit;
use App\Models\Employer;
use App\Models\JobListing;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        $employers = Employer::all();

        foreach ($employers as $employer) {

            // Each employer gets between 2–5 jobs
            $jobs = JobListing::factory(rand(1, 3))->create([
                'employer_id' => $employer->id
            ]);

            foreach ($jobs as $job) {

                // Seed Qualifications: 3–6
                JobQualification::factory(rand(3, 6))->create([
                    'job_listing_id' => $job->id
                ]);

                // Seed Responsibilities: 4–8
                JobResponsibility::factory(rand(4, 8))->create([
                    'job_listing_id' => $job->id
                ]);

                // Seed Benefits: 2–4
                JobBenefit::factory(rand(2, 4))->create([
                    'job_listing_id' => $job->id
                ]);
            }
        }
    }
}
