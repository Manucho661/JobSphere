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
        Schema::table('employers', function (Blueprint $table) {
            $table->string('website')->nullable()->after('phone');
            $table->string('location')->nullable()->after('website');
            $table->string('companySize')->nullable()->after('location');
            $table->boolean('verified')->default(false)->after('companySize');
            $table->text('companyDescription')->nullable()->after('verified');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employers', function (Blueprint $table) {
            $table->dropColumn([
                'website',
                'location',
                'companySize',
                'verified',
                'companyDescription'
            ]);
        });
    }
};
