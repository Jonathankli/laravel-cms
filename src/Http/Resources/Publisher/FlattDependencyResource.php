<?php

namespace Jkli\Cms\Http\Resources\Publisher;

use Illuminate\Http\Resources\Json\JsonResource;

class FlattDependencyResource extends JsonResource
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
        $parentClass = $this->getParent() ? get_class($this->getParent()?->getModel()) : null;
        return [
            'model' => $this->getModel(),
            'name' => $this->getModel()->getPublishableName(),
            'parent_type' => $parentClass,
            'parent_id' => $this->getParent()?->getModel()->getKey(),
            'isOptional' => $this->getRelation()?->getOptions()->optional ?? false,
            'isSilent' => $this->getRelation()?->getOptions()->silent ?? false,
            'isPublished' => $this->isPublished(),
            'key' => $this->getKey(),
        ];
    }
}