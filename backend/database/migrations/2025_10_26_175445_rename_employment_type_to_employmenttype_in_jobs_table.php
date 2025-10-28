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
            if (Schema::hasColumn('jobs', 'employment_type')) {
                $table->renameColumn('employment_type', 'employmentType');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            //
            if (Schema::hasColumn('jobs', 'employmentType')) {
                $table->renameColumn('employmentType', 'employment_type');
            }
        });
    }
};
