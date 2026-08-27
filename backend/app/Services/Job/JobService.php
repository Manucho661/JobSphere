<?php

namespace App\Services\Job;

use App\Models\Employer;
use App\Models\JobBenefit;
use App\Models\JobListing;
use App\Models\JobQualification;
use App\Models\JobResponsibility;
use App\Models\User;
use App\Repositories\Eloquent\JobListingRepository;
use Illuminate\Support\Facades\DB;

class JobService
{
    public function createJob(int $userId, array $data): JobListing
    {
        $employer = Employer::where('user_id', $userId)->first();

        if (!$employer) {
            throw new \Exception('User is not an employer');
        }

        return DB::transaction(function () use ($employer, $data) {

            $job = $employer->jobListings()->create([
                'job_title' => $data['jobTitle'],
                'employment_type' => $data['employmentType'],
                'category' => $data['category'],
                'experience_level' => $data['experienceLevel'],
                'work_place' => $data['workPlace'],
                'location' => $data['location'],
                'description' => $data['description'],
                'salary_min' => $data['salaryMin'],
                'salary_max' => $data['salaryMax'],
            ]);

            collect(explode("\n", $data['responsibilities']))
                ->filter()
                ->each(
                    fn($responsibility) =>
                    JobResponsibility::create([
                        'job_listing_id' => $job->id,
                        'responsibility' => trim($responsibility),
                    ])
                );

            collect(explode("\n", $data['requiredQualifications']))
                ->filter()
                ->each(
                    fn($qualification) =>
                    JobQualification::create([
                        'job_listing_id' => $job->id,
                        'qualification' => trim($qualification),
                    ])
                );

            collect(explode("\n", $data['benefits']))
                ->filter()
                ->each(
                    fn($benefit) =>
                    JobBenefit::create([
                        'job_listing_id' => $job->id,
                        'benefit' => trim($benefit),
                    ])
                );

            return $job;
        });
    }

    public function getJobsForUser(?User $user)
    {
        if (!$user) {
        }

        if ($user->role === 'employer') {
        }
    }
}
