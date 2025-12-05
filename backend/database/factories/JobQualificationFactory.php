<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class JobQualificationFactory extends Factory
{
    public function definition(): array
    {
        $qualifications = [
            'Bachelor’s degree in Computer Science or related field',
            '3+ years of experience in a similar role',
            'Strong knowledge of Laravel & PHP',
            'Proficiency in JavaScript and React',
            'Experience with cloud platforms (AWS, Azure, GCP)',
            'Strong problem-solving skills',
            'Experience with MySQL or PostgreSQL',
            'Knowledge of cybersecurity best practices',
        ];

        return [
            'qualification' => $this->faker->randomElement($qualifications),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
