<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employer>
 */
class EmployerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'userId' => User::inRandomOrder()->first()->id ?? User::factory(),
            'phone' => $this->faker->phoneNumber(), // ✅ comes before website
            'website' => $this->faker->url(),
            'location' => $this->faker->city(),
            'companySize' => $this->faker->randomElement(['Small', 'Medium', 'Large']),
            'verified' => $this->faker->boolean(),
            'companyDescription' => $this->faker->paragraph(),
        ];
    }
}
