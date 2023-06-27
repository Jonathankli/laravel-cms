<?php

namespace Jkli\Cms\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShowPageRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $base = config('cms.cms_param_base', '_cms');

        return [
            $base.'_nav' => ['nullable', 'boolean'],
            $base.'_media' => ['nullable', 'boolean'],
            $base.'_objects' => ['nullable', 'boolean'],
            $base.'_pps' => ['nullable', 'array'],
            $base.'_pps.path' => ['nullable', 'string'],
            $base.'_pps.parent' => ['nullable', 'string'],
            $base.'_pps.use_parent_path' => ['nullable', 'string'],
        ];
    }
}
