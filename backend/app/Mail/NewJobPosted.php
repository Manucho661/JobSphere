<?php

namespace App\Mail;

use App\Models\JobListing;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewJobPosted extends Mailable
{
    use Queueable, SerializesModels;

    public JobListing $job;

    public function __construct(JobListing $job)
    {
        $this->job = $job;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Job Posted: ' . $this->job->title,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.jobs.new',
            with: [
                'title' => $this->job->title,
                'company' => $this->job->company,
                'location' => $this->job->location,
                'url' => route('jobs.show', $this->job->id),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
