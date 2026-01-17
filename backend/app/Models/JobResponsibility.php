<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobResponsibility extends Model
{
    use HasFactory;
    protected $fillable = [
        'job_listing_id',
        'responsibility',
    ];

    /**
     * Relationship: A responsibility belongs to a job.
     */
    public function job()
    {
        return $this->belongsTo(JobListing::class);
    }
}
