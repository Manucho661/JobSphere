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
        // Fake Kenyan company names
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
            
            'companyName' => $this->faker->randomElement($kenyanCompanies),
            'logoUrl' => 'https://placehold.co/100x100',
            'phone' => '07' . rand(10, 99) . rand(100000, 999999),
            'website' => 'https://' . $this->faker->domainName(),
            'location' => $this->faker->city(), // can replace with Kenyan cities
            'companySize' => $this->faker->randomElement(['1-10', '11-50', '51-200', '200+']),
            'verified' => $this->faker->boolean(70), // 70% chance verified
            'companyDescription' => $this->faker->paragraph(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
