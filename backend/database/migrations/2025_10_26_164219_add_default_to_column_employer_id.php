<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            // Get column info
            $column = DB::select("
                SHOW COLUMNS FROM jobs WHERE Field = 'employer_id'
            ")[0];

            // If no default is set, modify the column to add default 2
            if ($column->Default === null) {
                Schema::table('jobs', function (Blueprint $table) {
                    $table->unsignedBigInteger('employer_id')
                        ->default(2)
                        ->change();
                });
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            // Remove the default if it was added
            if (Schema::hasColumn('jobs', 'employer_id')) {
                Schema::table('jobs', function (Blueprint $table) {
                    $table->unsignedBigInteger('employer_id')
                        ->default(null)
                        ->change();
                });
            }
        });
    }
};
