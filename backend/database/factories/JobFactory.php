<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $titles = [
            'Software Engineer',
            'Front-end Developer',
            'Back-end Developer',
            'Full Stack Developer',
            'Mobile App Developer',
            'DevOps Engineer',
            'Data Analyst',
            'UI/UX Designer',
            'Cloud Engineer',
            'IT Support Specialist'
        ];

        return [
            'job_title' => $this->faker->randomElement($titles),
            'category' => 'Technology',
            'employment_type' => $this->faker->randomElement(['Full-time', 'Contract', 'Part-time']),
            'experience_level' => $this->faker->randomElement(['Junior', 'Mid', 'Senior']),
            'work_place' => $this->faker->randomElement(['Remote', 'Hybrid', 'On-site']),
            'location' => $this->faker->city(),
            'description' => $this->faker->paragraph(5),
            'salary_min' => $this->faker->numberBetween(30000, 80000),
            'salary_max' => $this->faker->numberBetween(90000, 250000),
            'active' => 1,
            'is_featured' => 0,
            'likes' => $this->faker->numberBetween(0, 200),
            'created_at' => now(),
            'updated_at' => now()
        ];

    }
}
