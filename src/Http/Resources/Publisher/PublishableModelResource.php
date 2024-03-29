<?php

namespace Jkli\Cms\Http\Resources\Publisher;

use Illuminate\Http\Resources\Json\JsonResource;
use Jkli\Cms\Enums\PublishStatus;

class PublishableModelResource extends JsonResource
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
            'id' => $this->getKey(),
            'name' => $this->getPublishableName(),
            'deleted' => $this->trashed() ?? false,
            'published' => $this->{$this->getPublishStatusFlag()},
        ];
    }
}