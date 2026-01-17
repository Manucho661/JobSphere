<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SavedJob extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_listing_id',
    ];

    // Each saved job belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Add this relationship
    public function job_listing()
    {
        return $this->belongsTo(JobListing::class, 'job_listing_id');
    }
}
