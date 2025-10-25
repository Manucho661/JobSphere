<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobQualification extends Model
{
    //
    protected $fillable = [
        'job_id',
        'qualification',
    ];

    /**
     * Relationship: Each qualification belongs to one job.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
