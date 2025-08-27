<?php

namespace Database\Factories;

use App\Models\Employer;
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
        return [
            'employer_id' => Employer::inRandomOrder()->first()->id ?? Employer::factory(),
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(5),
            'active' => $this->faker->boolean(), // ✅ true/false for active status
            'salary' => $this->faker->numberBetween(30000, 120000),
            'likes' => $this->faker->numberBetween(0, 500),
        ];
    }
}
