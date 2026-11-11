<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

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
            'phone' => ['sometimes', 'nullable', 'string', 'max:20'],
            'industry' => ['sometimes', 'nullable', 'string', 'max:255'],
            'company_size' => ['sometimes', 'nullable', 'string', 'max:255'],
            'founded_year' => ['sometimes', 'nullable', 'integer', 'digits:4'],
            'company_website' => ['sometimes', 'nullable', 'url', 'max:255'],
            'company_description' => ['sometimes', 'nullable', 'string'],
            'county' => ['sometimes', 'nullable', 'string', 'max:255'],
            'company_mission' => ['sometimes', 'nullable', 'string'],
            'company_vision' => ['sometimes', 'nullable', 'string'],
            'linkedin_url' => ['sometimes', 'nullable', 'url', 'max:255'],
            'facebook_url' => ['sometimes', 'nullable', 'url', 'max:255'],
            'twitter_url' => ['sometimes', 'nullable', 'url', 'max:255'],
        ];
    }

    public function withValidator(Validator $validator)
    {
        $validator->after(function ($validator) {
            if (collect($this->rules())->keys()->intersect(array_keys($this->all()))->isEmpty()) {
                $validator->errors()->add('company_details', 'At least one company detail must be provided.');
            }
        });
    }
}
