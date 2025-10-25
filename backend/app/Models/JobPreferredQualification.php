<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobPreferredQualification extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'preferred_qualification',
    ];
    /**
     * Relationship: Each preferred qualification belongs to one job.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
