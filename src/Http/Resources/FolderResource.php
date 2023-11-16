<?php

namespace Jkli\Cms\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FolderResource extends JsonResource
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
            'parent_id' => $this->parent_id,
            'parent' => self::make($this->whenLoaded('parent')),
            'folders' => self::collection($this->whenLoaded('children')),
            'media' => MediaResource::collection($this->whenLoaded('media')),
            'media_count' => $this->mediaCount,
            'folder_count' => $this->folderCount
        ];
    }
}