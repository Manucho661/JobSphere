<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobResponsibility>
 */
class JobResponsibilityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $responsibilities = [
            'Write clean and scalable code',
            'Maintain existing codebase',
            'Collaborate with product team',
            'Debug and resolve issues',
            'Optimize application performance',
            'Participate in code reviews'
        ];
        return [
            'responsibility' => implode(', ', $this->faker->randomElements($responsibilities, rand(3, 6))),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
