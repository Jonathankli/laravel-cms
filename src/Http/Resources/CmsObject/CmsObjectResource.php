<?php

namespace Jkli\Cms\Http\Resources\CmsObject;

class CmsObjectResource extends StaticCmsObjectResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return array_merge(parent::toArray($request), [
            'id' => $this->getNode()->id,
            'settings' => SettingResource::collection($this->settings()),
        ]);
    }
}