<?php

namespace Jkli\Cms\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateMediaRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'file_name' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'copy' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'text'],
            'alt' => ['nullable', 'string', 'max:255'],
            'optimize' => ['nullable', 'boolean'],
            'folder_id' => ['nullable', 'exists:folders,id'],
        ];
    }
}
