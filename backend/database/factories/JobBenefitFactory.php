<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobBenefit>
 */
class JobBenefitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $benefits = [
            'Health Insurance',
            'Paid Time Off',
            'Remote Work Options',
            'Laptop provided',
            'Annual Bonus',
            'Flexible Hours'
        ];
        return [
            'benefit' => implode(', ', $this->faker->randomElements($benefits, rand(2, 4))),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
