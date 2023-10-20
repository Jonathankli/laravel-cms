<?php

namespace Jkli\Cms\Http\Requests;

class DeletePageRequest extends ShowPageRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'keepPath' => ['nullable', 'boolean', 'required_if:method,newparent'],
            'method' => ['nullable', 'in:newparent,delete'],
            'newparent' => ['nullable', 'required_if_method:newparent', 'exists:pages,id'],
        ];
    }
}
