<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobListing>
 */
class JobListingFactory extends Factory
{
    
    public function definition(): array
    {
        $titles = [
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Developer',
            'Mobile App Developer',
            'DevOps Engineer',
            'Data Analyst',
            'Machine Learning Engineer',
            'UI/UX Designer',
            'Cloud Engineer',
            'Cybersecurity Specialist',
        ];

        $meaningfulDescriptions = [
            "We are looking for a passionate developer to join our growing tech team. The ideal candidate should be excited about solving real-world problems, collaborating with cross-functional teams, and building scalable digital solutions. You will work with modern technologies and contribute to both new and existing projects.",
            
            "This role involves designing, developing, and maintaining high-quality software applications. You will participate in code reviews, optimize system performance, and ensure best practices in security and development standards. A strong ability to troubleshoot and learn new tools is essential.",
            
            "You will play a key role in building innovative systems that support thousands of users. The position requires strong technical skills, attention to detail, and the ability to break down complex tasks into manageable deliverables. You will also collaborate with designers, product managers, and other engineers.",
            
            "As part of our development team, you will work on both greenfield and existing products. The ideal candidate is self-driven, adaptable, and capable of writing clean, maintainable code. You will contribute to improving user experience and enhancing product stability.",
            
            "We are seeking a dedicated engineer to help design and scale mission-critical applications. You will be responsible for implementing new features, automating workflows, and enhancing platform reliability. This is a great opportunity for individuals who enjoy continuous learning and innovation.",
        ];

        return [
            'job_title' => $this->faker->randomElement($titles),
            'category' => $this->faker->randomElement(['Software Development', 'IT Support', 'Data', 'Cybersecurity', 'Cloud', 'Design']),
            'employment_type' => $this->faker->randomElement(['Full-time', 'Part-time', 'Contract']),
            'experience_level' => $this->faker->randomElement(['Junior', 'Mid-level', 'Senior']),
            'work_place' => $this->faker->randomElement(['Remote', 'Hybrid', 'On-site']),
            'location' => $this->faker->randomElement([
                'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Machakos', 'Meru', 'Nyeri'
            ]),

            // ✔ Meaningful job description
            'description' => $this->faker->randomElement($meaningfulDescriptions),

            'salary_min' => 40000,
            'salary_max' => 200000,
            'active' => 1,
            'is_featured' => 0,
            'likes' => rand(0, 250),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
