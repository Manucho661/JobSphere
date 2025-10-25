<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
             $table->string('job_category')->after('title');
            $table->enum('employment_type', ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'])
                  ->after('job_category');
            $table->string('experience_level')->after('employment_type');
            $table->string('work_place')->after('experience_level'); // e.g., Onsite, Remote, Hybrid
            $table->string('location')->after('work_place');
            $table->decimal('max_salary', 10, 2)->nullable()->after('salary');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
              $table->dropColumn([
                'job_category',
                'employment_type',
                'experience_level',
                'work_place',
                'location',
                'max_salary'
            ]);
        });
    }
};
