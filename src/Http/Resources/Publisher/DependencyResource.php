<?php

namespace Jkli\Cms\Http\Resources\Publisher;

use Illuminate\Http\Resources\Json\JsonResource;
use Jkli\Cms\Facades\Cms;

class DependencyResource extends JsonResource
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
            'model' => $this->getModel(),
            'name' => $this->getModel()->getPublishableName(),
            'typeName' => $this->getModel()->getPublishableTypeName(),
            'relations' => RelationResource::collection($this->getRelations())->all(),
            'status' => $this->getPublishedStatus(),
            'deleted' => $this->isDeleted(),
            'key' => $this->getKey(),
        ];
    }
}