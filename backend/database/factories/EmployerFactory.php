<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployerFactory extends Factory
{
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

        $descriptions = [
            'A Kenyan tech company focused on building secure, scalable digital solutions for businesses across East Africa.',
            'We specialize in mobile and web applications that help organizations automate workflows and improve customer experience.',
            'A fast-growing software firm providing cloud services, custom systems, and enterprise IT support.',
            'An innovation-driven team delivering modern tech products including e-commerce platforms and payment integrations.',
            'A digital lab committed to helping startups and SMEs adopt modern technologies to grow and scale.',
        ];

        $kenyanLocations = [
            'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Uasin Gishu',
            'Kakamega', 'Busia', 'Trans Nzoia', 'Meru', 'Machakos',
            'Kericho', 'Nyeri', 'Isiolo', 'Lamu', 'Garissa',
            'Kisii', 'Embu', 'Bungoma', 'Kilifi', 'Homa Bay',
        ];

        return [
            'user_id' => User::factory()->state([
                'role' => 'employer',
            ]),

            'company_name' => $this->faker->randomElement($kenyanCompanies),
            'phone' => '07' . rand(10, 99) . rand(100000, 999999),
            'logo_url' => 'https://placehold.co/100x100',

            'industry' => $this->faker->randomElement([
                'Technology',
                'Finance',
                'Education',
                'Healthcare',
                'Manufacturing',
            ]),

            'company_size' => $this->faker->randomElement([
                '1-10',
                '11-50',
                '51-200',
                '200+',
            ]),

            'founded_year' => $this->faker->numberBetween(1990, 2025),

            'company_website' => 'https://' . $this->faker->domainName(),

            'company_description' => $this->faker->randomElement($descriptions),

            'county' => $this->faker->randomElement($kenyanLocations),

            'company_mission' => $this->faker->sentence(),
            'company_vision' => $this->faker->sentence(),

            'linkedin_url' => 'https://linkedin.com/company/' . $this->faker->slug(),
            'facebook_url' => 'https://facebook.com/' . $this->faker->slug(),
            'twitter_url' => 'https://twitter.com/' . $this->faker->slug(),

            // verified is intentionally omitted.
            // The database default will set it to false.
        ];
    }
}