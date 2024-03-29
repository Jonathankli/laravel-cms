<?php

namespace Jkli\Cms\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
        $object = $this->resource->getObjectInstance();

        return [
            'id' => $this->id,
            'type' => $this->type,
            'component' => $object ? $object::component() : null,
            'parent_id' => $this->parent_id,
            'outlet' => $this->outlet,
            'index' => $this->index,
            'settings' => $object ? $object->settingData() : null,
            'data' => $object ? $object->getServersideData() : null,
        ];
    }
}