<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class JobResponsibilityFactory extends Factory
{
    public function definition(): array
    {
        $responsibilities = [
            'Develop and maintain web applications',
            'Collaborate with teams to define project requirements',
            'Write clean and maintainable code',
            'Participate in code reviews',
            'Troubleshoot and debug issues',
            'Improve system performance and scalability',
            'Maintain documentation',
        ];

        return [
            'responsibility' => $this->faker->randomElement($responsibilities),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
