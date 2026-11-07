<?php

namespace Tests\Feature;

use App\Models\Employer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CompanyTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
    public function test_employer_can_update_company_details(): void
    {
        $employer = Employer::factory()->create();

        $this->actingAs($employer->user);

        $response = $this->putJson('/api/employer/company', [
            'company_name' => 'Synovex Technologies',
            'phone' => '0712345678',
            'industry' => 'Technology',
            'company_size' => '51-200',
            'founded_year' => 2020,
            'company_website' => 'https://updatedcompany.com',
            'company_description' => 'Updated company description.',
            'county' => 'Nairobi',
            'company_mission' => 'To provide innovative solutions.',
            'company_vision' => 'To be the leading technology company in Africa.',
            'linkedin_url' => 'https://linkedin.com/company/updatedcompany',
            'facebook_url' => 'https://facebook.com/updatedcompany',
            'twitter_url' => 'https://twitter.com/updatedcompany',
        ]);

        $response->assertOk();

        $response->assertJsonPath(
            'message',
            'Company details updated successfully!'
        );

        $response->assertJsonPath('company.company_name', 'Synovex Technologies');
        $response->assertJsonPath('company.phone', '0712345678');
        $response->assertJsonPath('company.industry', 'Technology');
        $response->assertJsonPath('company.company_size', '51-200');
        $response->assertJsonPath('company.founded_year', 2020);
        $response->assertJsonPath('company.company_website', 'https://updatedcompany.com');
        $response->assertJsonPath('company.company_description', 'Updated company description.');
        $response->assertJsonPath('company.county', 'Nairobi');
        $response->assertJsonPath('company.company_mission', 'To provide innovative solutions.');
        $response->assertJsonPath('company.company_vision', 'To be the leading technology company in Africa.');
        $response->assertJsonPath('company.linkedin_url', 'https://linkedin.com/company/updatedcompany');
        $response->assertJsonPath('company.facebook_url', 'https://facebook.com/updatedcompany');
        $response->assertJsonPath('company.twitter_url', 'https://twitter.com/updatedcompany');

        $this->assertDatabaseHas('employers', [
            'id' => $employer->id,
            'company_name' => 'Synovex Technologies',
            'industry' => 'Technology',
            'company_size' => '51-200',
            'founded_year' => 2020,
            'county' => 'Nairobi',
        ]);
    }
}
