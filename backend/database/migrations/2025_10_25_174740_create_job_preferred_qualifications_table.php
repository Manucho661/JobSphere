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
        Schema::create('job_preferred_qualifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_id');
            $table->string('preferred_qualification');
            $table->timestamps();

             // Foreign key reference to jobs table
            $table->foreign('job_id')
                  ->references('id')
                  ->on('job_listings')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_preferred_qualifications');
    }
};
