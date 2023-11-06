<?php

namespace Jkli\Cms\Traits;

use Illuminate\Support\Collection;
use Jkli\Cms\Models\CmsNode;
use Jkli\Cms\Services\HasModelService;

trait InteractsWithModels
{

    protected string $modelType;

    function getModelIds(CmsNode $node): null|string|Collection 
    {
        $key = $this->getModelKey();
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

        if(is_string($ids)) {
            return $models->get($ids);
        }
    
        return $models->whereIn($this->getModelKey(), $ids);
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
