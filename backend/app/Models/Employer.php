<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    use HasFactory;

    // If you want to allow mass assignment (optional, but useful for seeding)
    protected $fillable = [
        'user_id',
        'phone',
        'logo_url',
        'industry',
        'company_size',
        'founded_year',
        'company_website',
        'company_description',
        'county',
        'company_mission',
        'company_vision',
        'linkedin_url',
        'facebook_url',
        'twitter_url',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function jobListings()
    {
        return $this->hasMany(JobListing::class);
    }
}
