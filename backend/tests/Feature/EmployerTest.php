<?php

namespace Tests\Feature;

use App\Models\Employer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EmployerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_employer_can_update_details(): void
    {
        $employer = Employer::factory()->create();

        $this->actingAs($employer->user);

        $response = $this->putJson('/api/employer', [
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
            'industry' => 'Technology',
            'company_size' => '51-200',
            'founded_year' => 2020,
            'county' => 'Nairobi',
        ]);
    }

    public function test_employer_cannot_update_details_with_empty_request(): void
    {
        $employer = Employer::factory()->create();

        $this->actingAs($employer->user);

        // Send an empty request
        $response = $this->putJson('/api/employer', []);

        // Assert validation failure
        $response->assertUnprocessable();

        // Assert the expected validation error
        $response->assertJsonValidationErrors([
            'company_details'
        ]);

        $response->assertJsonPath(
            'errors.company_details.0',
            'At least one company detail must be provided.'
        );
    }

    public function test_employer_cannot_update_details_with_invalid_data(): void
    {
        $employer = Employer::factory()->create();

        $this->actingAs($employer->user);

        // Send an invalid request
        $response = $this->putJson('/api/employer', [
            'founded_year' => 20,
            'company_website' => 'invalid-url',
        ]);

        // Assert validation failure
        $response->assertUnprocessable();

        // Assert the expected validation errors
        $response->assertJsonValidationErrors([
            'founded_year',
            'company_website',
        ]);
    }

    public function test_employer_can_update_details_with_optional_fields(): void
    {
        $employer = Employer::factory()->create();

        $this->actingAs($employer->user);

        // Send a request with only a few fields
        $response = $this->putJson('/api/employer', [
            'industry' => 'Technology',
            'phone' => ''
        ]);

        // Assert successful update
        $response->assertOk();

        // Assert the expected response structure
        $response->assertJsonPath('message', 'Company details updated successfully!');
        $response->assertJsonPath('company.industry', 'Technology');

        // Assert the database has been updated correctly
        $this->assertDatabaseHas('employers', [
            'id' => $employer->id,
            'industry' => 'Technology',
        ]);
    }
    public function test_employer_can_view_their_profile(): void
    {
        $employer = Employer::factory()->create([
            'industry' => 'Technology',
            'company_size' => '51-200',
            'county' => 'Nairobi',
        ]);

        $this->actingAs($employer->user);

        $response = $this->getJson('/api/employer');

        $response->assertOk();

        $response->assertJsonPath('company.id', $employer->id);
        $response->assertJsonPath('company.industry', 'Technology');
        $response->assertJsonPath('company.company_size', '51-200');
        $response->assertJsonPath('company.county', 'Nairobi');
    }

    public function test_guest_cannot_view_employer_profile(): void
    {
        $response = $this->getJson('/api/employer');

        $response->assertUnauthorized();
    }

    public function test_employer_only_sees_their_own_profile(): void
    {
        $employer = Employer::factory()->create();

        $employer->user->update([
            'name' => 'Synovex Technologies'
        ]);

        $otherEmployer = Employer::factory()->create();

        $otherEmployer->user->update([
            'name' => 'Other Company'
        ]);

        $this->actingAs($employer->user);

        $response = $this->getJson('/api/employer');
        $response->dump();
        $response->assertOk();

        $response->assertJsonPath('company.name', 'Synovex Technologies');

        $response->assertJsonMissing([
            'name' => 'Other Company'
        ]);
    }
}
