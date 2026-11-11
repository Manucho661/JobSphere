<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\EloquentFactories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $kenyanCompanies = [
            'Safaritech Solutions',
            'Nairobi Dynamics',
            'Kenya Digital Labs',
            'Mombasa IT Hub',
            'TechBridge Africa',
            'Wanyonyi Industries',
            'RapidSoft Kenya',
            'Busia Innovations',
            'Eldoret Connect Limited',
            'Lamu Smart Systems',
        ];
        return [
            'name' => $this->faker->randomElement($kenyanCompanies),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Hash::make('Manu1538'), // hashed password
            'role' => 'employer',                 // fixed role
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
