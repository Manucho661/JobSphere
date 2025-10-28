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
            Schema::table('jobs', function (Blueprint $table) {
                if (Schema::hasColumn('jobs', 'experience_level')) {
                    $table->renameColumn('experience_level', 'experienceLevel');
                }

                if (Schema::hasColumn('jobs', 'work_place')) {
                    $table->renameColumn('work_place', 'workPlace');
                }
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            //
            if (Schema::hasColumn('jobs', 'experienceLevel')) {
                $table->renameColumn('experienceLevel', 'experience_level');
            }

            if (Schema::hasColumn('jobs', 'workPlace')) {
                $table->renameColumn('workPlace', 'work_place');
            }
        });
    }
};
