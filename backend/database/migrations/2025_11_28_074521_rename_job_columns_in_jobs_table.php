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
            //
            $table->renameColumn('jobTitle', 'job_title');
            $table->renameColumn('employmentType', 'employement_type');
            $table->renameColumn('experienceLevel', 'experience_leve');
            $table->renameColumn('workPlace', 'work_place');
            $table->renameColumn('minSalary', 'salary_min');
            $table->renameColumn('maxSalary', 'salary_max');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            //
            $table->renameColumn('job_title', 'jobTitle');
            $table->renameColumn('employement_type', 'employmentType');
            $table->renameColumn('experience_level', 'experienceLevel');
            $table->renameColumn('work_place', 'workPlace');
            $table->renameColumn('salary_min', 'minSalary');
            $table->renameColumn('salary_max', 'maxSalary');
        });
    }
};
