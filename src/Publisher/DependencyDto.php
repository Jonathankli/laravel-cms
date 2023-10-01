<?php

namespace Jkli\Cms\Publisher;

use Illuminate\Support\Collection;
use Jkli\Cms\Contracts\Publishable;

class DependencyDto
{

    protected Collection $relations;

    protected DependencyDto $parent;

    protected Collection $ignoreKeys;

    protected ?RelationDto $relation = null;

    public function __construct(
        protected $model,
    ) {
        $this->relations = collect();
        $this->ignoreKeys = collect();
    }


    /**
     * Get the value of relations
     */
    public function getRelations()
    {
        return $this->relations;
    }

    public function getKey()
    {
        return get_class($this->model) . ":id:" . $this->model->getKey();
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


    /**
     * Get the value of parent
     */ 
    public function getParent()
    {
        return $this->parent ?? null;
    }

    /**
     * Set the value of parent
     *
     * @return  self
     */ 
    public function setParent(self $parent)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get the value of relation
     */ 
    public function getRelation()
    {
        return $this->relation;
    }

    /**
     * Set the value of relation
     *
     * @return  self
     */ 
    public function setRelation($relation)
    {
        $this->relation = $relation;

        return $this;
    }
}
