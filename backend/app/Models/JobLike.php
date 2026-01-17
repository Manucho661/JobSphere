<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobLike extends Model
{
    //
    protected $fillable = ['user_id', 'job_listing_id'];

    public function job_listing()
    {
        return $this->belongsTo(JobListing::class, 'job_listing_id');
    }
}
