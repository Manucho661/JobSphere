<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobQualification>
 */
class JobQualificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $qualification = [
            'Bachelor’s degree in Computer Science',
            '3+ years experience in software development',
            'Strong knowledge of JavaScript',
            'Experience with Laravel or Node.js',
            'Familiarity with MySQL or MongoDB'
        ];
        return [
            'qualification' => implode(', ', $this->faker->randomElements($qualification, rand(3, 5))),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
