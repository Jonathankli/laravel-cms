<?php

namespace Jkli\Cms\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FolderListResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'folders' => self::collection($this->whenLoaded('children')),
            'media' => MediaListResource::collection($this->whenLoaded('media')),
        ];
    }
}