<?php

namespace Jkli\Cms\Publisher;

use Illuminate\Support\Collection;
use Jkli\Cms\Contracts\Publishable;

class DependencyDto
{

    protected Collection $relations;

    public function __construct(
        protected $model,
    ) {
        $this->relations = collect();
    }


    /**
     * Get the value of relations
     */
    public function getRelations()
    {
        return $this->relations;
    }

    /**
     * Set the value of relations
     *
     * @return  self
     */
    public function setRelations($relations)
    {
        $this->relations = $relations;

        return $this;
    }

    /**
     * Get the value of model
     */
    public function getModel()
    {
        return $this->model;
    }


    /**
     * Get the value of isUpdated
     */
    public function isPublished()
    {
        return $this->model->{$this->model->getPublishedFlag()};
    }

    /**
     * Get the value of relationsUpdated
     */ 
    public function allRelationPublished()
    {
        return $this->relations->some(fn($relation) => $relation->hasUpdates()); 
    }

}
