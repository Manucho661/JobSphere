<?php
namespace Tests\Feature;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_user_can_register_with_valid_data(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'SecurePass123!',
            'role' => 'employer',
        ]);

        $response->assertCreated();

        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => 'employer',
        ]);

        $user = User::where('email', 'test@example.com')
            ->firstOrFail();

        $this->assertTrue(
            Hash::check('SecurePass123!', $user->password)
        );
    }

    public function test_registration_rejects_duplicate_email(): void
    {
        User::factory()->create([
            'email' => 'existing@example.com',
        ]);

        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'existing@example.com',
            'password' => 'SecurePass123!',
            'role' => 'employer',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['email']);

        $this->assertDatabaseCount('users', 1);
    }

    public function test_registration_rejects_missing_required_fields(): void
    {
        $response = $this->postJson('/api/register', []);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name',
            'email',
            'password',
            'role',
        ]);
    }

}
