<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyDetailsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company_name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'industry' => ['required', 'string', 'max:255'],
            'company_size' => ['required', 'string', 'max:255'],
            'founded_year' => ['required', 'integer', 'digits:4'],
            'company_website' => ['nullable', 'url', 'max:255'],
            'company_description' => ['nullable', 'string'],
            'county' => ['required', 'string', 'max:255'],
            'company_mission' => ['nullable', 'string'],
            'company_vision' => ['nullable', 'string'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'facebook_url' => ['nullable', 'url', 'max:255'],
            'twitter_url' => ['nullable', 'url', 'max:255'],
        ];
    }
}
