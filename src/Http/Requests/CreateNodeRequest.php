<?php

namespace Jkli\Cms\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateNodeRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'type' => ['required', 'string', 'max:255'], //add custom rule
            'settings' => ['required', 'json'], //add custom rule
            'outlet' => ['nullable', 'numeric'],
            'ref_node' => ['required', 'string', 'exists:nodes,id', 'max:255'],
            'insert' => ['required', 'string', 'in:before,after,outlet']
        ];
    }
}
