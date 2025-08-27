<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    use HasFactory;

    // If you want to allow mass assignment (optional, but useful for seeding)
    protected $fillable = [
        'userId',
        'phone',
        'website',
        'location',
        'companySize',
        'verified',
        'companyDescription',
    ];
}
