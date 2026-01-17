<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobListing extends Model
{
    use HasFactory;

    protected $fillable = [
        'employer_id',
        'job_title',
        'category',
        'experience_level',
        'work_place',
        'location',
        'description',
        'salary_min',
        'salary_max',
        'salary',
        'active',
    ];

    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }

    public function responsibilities()
    {
        return $this->hasMany(JobResponsibility::class);
    }

    public function qualifications()
    {
        return $this->hasMany(JobQualification::class);
    }

    public function preferredQualifications()
    {
        return $this->hasMany(JobPreferredQualification::class);
    }

    public function benefits()
    {
        return $this->hasMany(JobBenefit::class);
    }

    /*
|--------------------------------------------------------------------------
| SAVES
|--------------------------------------------------------------------------
*/

    // Users who saved this job
    public function savedBy()
    {
        return $this->hasMany(SavedJob::class, 'job_listing_id');
    }

    // Check if a given user saved this job
    public function isSavedByUser($userId)
    {
        return $this->savedBy()
            ->where('user_id', $userId)
            ->exists();
    }

    /*
|--------------------------------------------------------------------------
| LIKES
|--------------------------------------------------------------------------
*/

    // Users who liked this job
    public function likes()
    {
        return $this->hasMany(JobLike::class);
    }

    // Check if a given user liked this job
    public function isLikedByUser($userId)
    {
        return $this->likes()
            ->where('user_id', $userId)
            ->exists();
    }
}
