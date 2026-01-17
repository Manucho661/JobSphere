<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobBenefit extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'benefit',
    ];

    /**
     * Relationship: Each benefit belongs to one job.
     */
    public function job()
    {
        return $this->belongsTo(JobListing::class);
    }
}
