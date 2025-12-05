<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobQualification extends Model
{
    use HasFactory;

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
