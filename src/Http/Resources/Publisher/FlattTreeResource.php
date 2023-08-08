<?php

namespace Jkli\Cms\Http\Resources\Publisher;

use Illuminate\Http\Resources\Json\JsonResource;
use Jkli\Cms\Facades\Cms;

class FlattTreeResource extends JsonResource
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
        $className = get_class($this->resource[0]?->getModel());
        $type = Cms::getPublishable()->get($className);
        return [
            'type' => $type,
            'key' => $className,
            'name' => $className::getPublishableTypeName(),
            'models' => FlattDependencyResource::collection($this->resource)->all()
        ];
    }
}
