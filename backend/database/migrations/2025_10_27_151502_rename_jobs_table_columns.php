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
                if (Schema::hasColumn('jobs', 'salary')) {
                    $table->renameColumn('salary', 'minSalary');
                }

                if (Schema::hasColumn('jobs', 'max_salary')) {
                    $table->renameColumn('max_salary', 'maxSalary');
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
             if (Schema::hasColumn('jobs', 'minSalary')) {
                $table->renameColumn('minSalary', 'salary');
            }

            if (Schema::hasColumn('jobs', 'maxSalary')) {
                $table->renameColumn('maxSalary', 'max_salary');
            }
        });
    }
};
