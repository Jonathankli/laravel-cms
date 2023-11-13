<?php

namespace Jkli\Cms\Http\Resources\CmsObject;

use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'type' => $this->resource::type(),
            'component' => $this->resource::component(),
            'title' => $this->getTitle(),
            'name' => $this->getName(),
            'metas' => $this->getMetas(),
            'default' => $this->getDefault(),
            'data' => $this->serverData(null),
            'serversideValidation' => $this->serversideValidation(),
            'optimistic' => $this->getOptimistic(),
        ];
    }
}