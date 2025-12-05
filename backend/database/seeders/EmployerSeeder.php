<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Employer;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EmployerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users with role = employer
        $employerUsers = User::where('role', 'employer')->get();

        foreach ($employerUsers as $user) {
            Employer::factory()->create([
                'user_id' => $user->id
            ]);
        }
    }
}
