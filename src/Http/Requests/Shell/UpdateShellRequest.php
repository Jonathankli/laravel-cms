<?php

namespace Jkli\Cms\Http\Requests\Shell;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateShellRequest extends CreateShellRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('shells', 'name')->ignore($this->route('shell'))],
        ];
    }
}
