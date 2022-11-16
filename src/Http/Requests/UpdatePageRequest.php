<?php

namespace Jkli\Cms\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePageRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'path' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'no_index' => ['nullable', 'boolean'],
            'no_follow' => ['nullable', 'boolean'],
            'uses_parent_path' => ['nullable', 'boolean'],
        ];
    }
}
