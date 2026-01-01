<?php

namespace App\Jobs;

use App\Models\JobListing;
use App\Mail\NewJobPosted;
use App\Models\JobNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendNewJobNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected JobListing $postedJob;

    public function __construct(JobListing $postedJob)
    {
        $this->postedJob = $postedJob;
    }

    public function handle(): void
    {
        $subscribers = JobNotification::all();

        foreach ($subscribers as $subscriber) {
            Mail::to($subscriber->email)
                ->send(new NewJobPosted($this->postedJob));
        }
    }
}
