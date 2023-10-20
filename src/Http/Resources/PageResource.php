<?php

namespace Jkli\Cms\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
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
            'title' => $this->title,
            'parent_id' => $this->parent_id,
            'parent' => PageResource::make($this->whenLoaded('parent')),
            'path' => $this->full_path,
            'relative_path' => $this->path,
            'shell_id' => $this->shell_id,
            'shell' => ShellResource::make($this->whenLoaded('shell')),
            'node_id' => $this->node_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}