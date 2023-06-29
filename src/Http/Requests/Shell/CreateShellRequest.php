<?php

namespace Jkli\Cms\Http\Requests\Shell;

use Illuminate\Foundation\Http\FormRequest;

class CreateShellRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:shells,name'],
        ];
    }
}
