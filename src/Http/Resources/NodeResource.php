<?php

namespace Jkli\Cms\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Jkli\Cms\Facades\Cms;

class NodeResource extends JsonResource
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
        $objects = Cms::getCmsObjects();
        $object = $objects->get($this->type);

        return [
            'id' => $this->id,
            'type' => $this->type,
            'component' => $object ? $object::component() : null,
            'parent' => $this->parent_id,
            'outlet' => $this->outlet,
            'index' => $this->index,
            'settings' => $this->settings,
        ];
    }
}