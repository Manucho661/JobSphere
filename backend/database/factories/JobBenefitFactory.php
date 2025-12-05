<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class JobBenefitFactory extends Factory
{
    public function definition(): array
    {
        $benefits = [
            'Health insurance',
            'Paid leave and holidays',
            'Remote work options',
            'Professional growth opportunities',
            'Performance bonuses',
            'Retirement benefits',
        ];

        return [
            'benefit' => $this->faker->randomElement($benefits),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
