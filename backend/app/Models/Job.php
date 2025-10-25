<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'employer_id',
        'title',
        'description',
        'salary',
        'likes',
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
}
