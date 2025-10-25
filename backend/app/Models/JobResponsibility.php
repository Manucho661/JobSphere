<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobResponsibility extends Model
{
    //
    protected $fillable = [
        'job_id',
        'responsibility',
    ];

    /**
     * Relationship: A responsibility belongs to a job.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
