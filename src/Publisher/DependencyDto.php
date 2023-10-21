<?php

namespace Jkli\Cms\Publisher;

use Illuminate\Support\Collection;
use Jkli\Cms\Contracts\Publishable;
use Jkli\Cms\Enums\PublishStatus;

class DependencyDto
{

    protected Collection $relations;

    protected DependencyDto $parent;

    protected Collection $ignoreKeys;

    protected ?RelationDto $relation = null;

    public $modelKey;

    public function __construct(
        protected $model,
    ) {
        $this->relations = collect();
        $this->ignoreKeys = collect();
        $this->modelKey = $this->model->getKey();
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
    public function getPublishedStatus()
    {
        return $this->model->{$this->model->getPublishStatusFlag()};
    }

    /**
     * Get the value of isUpdated
     */
    public function isDeleted()
    {
        return $this->model->trashed();
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
