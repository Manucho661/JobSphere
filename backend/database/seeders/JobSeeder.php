<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\Employer;
use App\Models\JobBenefit;
use Illuminate\Database\Seeder;
use App\Models\JobQualification;
use App\Models\JobResponsibility;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employers = Employer::all();

        foreach ($employers as $employer) {

            // each employer gets between 2-5 jobs
            $jobCount = rand(2, 5);

            for ($i = 0; $i < $jobCount; $i++) {

                // create job
                $job = Job::factory()->create([
                    'employer_id' => $employer->id
                ]);

                // create related items
                JobQualification::factory()->create([
                    'job_id' => $job->id
                ]);

                JobResponsibility::factory()->create([
                    'job_id' => $job->id
                ]);

                JobBenefit::factory()->create([
                    'job_id' => $job->id
                ]);
            }
        }
    }
}
