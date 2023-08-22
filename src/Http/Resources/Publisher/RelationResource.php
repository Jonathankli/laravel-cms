<?php

namespace Jkli\Cms\Http\Resources\Publisher;

use Illuminate\Http\Resources\Json\JsonResource;

class RelationResource extends JsonResource
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
            'name' => $this->getName(),
            'optional' => $this->getOptions()->optional,
            'silent' => $this->getOptions()->silent,
            'dependencies' => DependencyResource::collection($this->getDependencies())->all(),
            // 'key' => $this->getKey(),
        ];
    }
}