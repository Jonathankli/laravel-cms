<?php

namespace Jkli\Cms\Http\Resources\Publisher;

use Illuminate\Http\Resources\Json\JsonResource;

class PublishableResource extends JsonResource
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
            'publishedCount' => isset($this->publishedCount) ? $this->publishedCount : null,
            'count' => isset($this->count) ? $this->count : null,
            'pendingCount' => isset($this->pendingCount) ? $this->pendingCount : null,
            'deletedCount' => isset($this->deletedCount) ? $this->deletedCount : null,
            'draftCount' => isset($this->draftCount) ? $this->draftCount : null,
            'name' => $this->name,
            'type' => $this->type,
        ];
    }
}