<?php

namespace Database\Factories;

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
            "A Kenyan tech company focused on building secure, scalable digital solutions for businesses across East Africa.",
            "We specialize in mobile and web applications that help organizations automate workflows and improve customer experience.",
            "A fast-growing software firm providing cloud services, custom systems, and enterprise IT support.",
            "An innovation-driven team delivering modern tech products including e-commerce platforms and payment integrations.",
            "A digital lab committed to helping startups and SMEs adopt modern technologies to grow and scale.",
            "A trusted provider of IT consulting, systems development, cybersecurity solutions, and digital transformation services.",
            "We deliver end-to-end technology solutions from UI/UX design, development, cloud deployment, to long-term support.",
            "A software engineering powerhouse building reliable tech infrastructure for companies across Kenya.",
            "A multidisciplinary tech company helping organizations modernize through automation, AI tools, and cloud platforms.",
            "An ICT solutions provider creating smart, efficient, and user-friendly business systems for African industries."
        ];

        // NEW: Real Kenyan Locations
        $kenyanLocations = [
            'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
            'Kakamega', 'Busia', 'Kitale', 'Thika', 'Meru',
            'Machakos', 'Kericho', 'Nyeri', 'Isiolo', 'Lamu',
            'Garissa', 'Kisii', 'Naivasha', 'Malindi', 'Embu',
            'Bungoma', 'Voi', 'Narok', 'Kilifi', 'Homa Bay',
        ];

        return [
            'companyName' => $this->faker->randomElement($kenyanCompanies),
            'logoUrl' => 'https://placehold.co/100x100',
            'phone' => '07' . rand(10,99) . rand(100000, 999999),
            'website' => 'https://'. $this->faker->domainName(),
            'location' => $this->faker->randomElement($kenyanLocations), // ← Updated here
            'companySize' => $this->faker->randomElement(['1-10', '11-50', '51-200', '200+']),
            'verified' => $this->faker->boolean(70),
            'companyDescription' => $this->faker->randomElement($descriptions),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
