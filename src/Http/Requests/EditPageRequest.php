<?php

namespace Jkli\Cms\Http\Requests;

class EditPageRequest extends ShowPageRequest
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
            $base.'_enode' => ['nullable', 'string', 'exists:nodes,id'],
        ];
    }
}
