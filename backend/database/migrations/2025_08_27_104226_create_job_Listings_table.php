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
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id')->constrained('employers')->onDelete('cascade');
            $table->string('job_title');
            $table->string('category');
            $table->enum('employment_type', ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']);
            $table->string('experience_level');
            $table->string('work_place'); // e.g., Onsite, Remote, Hybrid
            $table->string('location');
            $table->decimal('salary_min', 10, 2)->nullable();
            $table->decimal('salary_max', 10, 2)->nullable();
            $table->string('type')->nullable(); // e.g. full-time, part-time
            $table->text('description')->nullable();
            $table->decimal('salary', 10, 2)->nullable();
            $table->boolean('active')->default(true);
            $table->tinyInteger('is_featured')->default(0);
            $table->unsignedInteger('likes')->default(0); // ✅ new column
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
