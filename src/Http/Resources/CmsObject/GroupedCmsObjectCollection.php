<?php

namespace Jkli\Cms\Http\Resources\CmsObject;

use Illuminate\Http\Resources\Json\ResourceCollection;

class GroupedCmsObjectCollection extends ResourceCollection
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
        $grouped = $this->collection->groupBy(function ($item) {
            return $item::group();
        }, true);

        return $grouped->map(fn($objects, $group) => [
            'name' => $group,
            'objects' => StaticCmsObjectResource::collection($objects)->all()
        ])->values();
    }
}