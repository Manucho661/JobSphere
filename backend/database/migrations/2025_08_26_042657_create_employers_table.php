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
        Schema::create('employers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->string('company_name')->nullable();
            $table->string('phone')->nullable();
            $table->boolean('verified')->default(false);
            $table->string('logo_url')->nullable();

            $table->string('industry')->nullable();
            $table->string('company_size')->nullable();
            $table->unsignedSmallInteger('founded_year')->nullable();

            $table->string('company_website')->nullable();
            $table->text('company_description')->nullable();
            $table->string('county')->nullable();

            $table->text('company_mission')->nullable();
            $table->text('company_vision')->nullable();

            $table->string('linkedin_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('twitter_url')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employers');
    }
};
