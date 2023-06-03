<?php

namespace Jkli\Cms\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Jkli\Cms\Facades\Cms;

class ConfigResource extends JsonResource
{

    /**
     * The "data" wrapper that should be applied.
     *
     * @var string|null
     */
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'paths' => [
                'live' => config('cms.live_path', "/"),
                'cms' => config('cms.cms_path', "/cms"),
                'admin' => config('cms.cms_path', "/cms") . "/admin",
                'api' => config('cms.cms_path', "/cms") . "/admin/api",
            ],
            'params' => [
                'base' => config('cms.cms_param_base', '_cms'),
            ]
        ];
    }
}