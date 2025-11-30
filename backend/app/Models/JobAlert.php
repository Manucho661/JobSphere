<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobAlert extends Model
{
    //
    use HasFactory;

    protected $table = 'job_alerts';

    protected $fillable = [
        'user_id',
        'email',
        'is_active',
    ];

    /**
     * Relationship: A job alert belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
