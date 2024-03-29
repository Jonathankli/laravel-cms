<?php

namespace Jkli\Cms\Traits;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Jkli\Cms\Models\CmsNode;
use Jkli\Cms\Services\HasModelService;

trait InteractsWithModels
{

    function getModelIds(CmsNode $node): null|string|Collection 
    {
        $key = $this->getModelKey();
        $value = parent::getValue($node);
        return data_get(parent::getValue($node), $key);
    }

    function getModelType(): string 
    {
        return $this->modelType;
    }

    function getModelKey(): string 
    {
        return $this->modelKey ?? (new $this->modelType)->getKey() ?? 'id';
    }

    /**
     * Get the value from the node
     * 
     * @return mixed $name 
     */
    public function getValue(CmsNode $node): mixed
    {
        $ids = $this->getModelIds($node);
        $models = HasModelService::getModels()
            ->get($this->getModelType(), collect());

        if(is_array($ids)) {
            $models = $models->whereIn($this->getModelKey(), $ids);
            return $this->getResource()::collection($models);
        }
        return $this->getResource()::make($models->get($ids));
    }

    public function getResource(): string 
    {
        return JsonResource::class;
    }

    /**
     * Does the setting need serversideValidation?
     * 
     * @return bool $serversideValidation 
     */
    public function serversideValidation(): bool
    {
        return true;
    }

}
