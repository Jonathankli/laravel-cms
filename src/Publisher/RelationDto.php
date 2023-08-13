<?php

namespace Jkli\Cms\Publisher;

use Illuminate\Support\Collection;
use Jkli\Cms\Publisher\Dependency;

class RelationDto
{
    //DependencyDto
    protected Collection $dependencies;

    public function __construct(
        protected string $name,
        protected PublishTimingEnum $timing,
        protected Dependency $options,
    ) {
        $this->dependencies = collect();
    }

    public function getKey(DependencyDto $parent)
    {
        $model = $parent->getModel();
        return get_class($model) . ":rel:" . $this->name;
    }

    /**
     * Get the value of dependencies
     */
    public function getDependencies()
    {
        return $this->dependencies;
    }

    /**
     * Set the value of dependencies
     *
     * @return  self
     */
    public function setDependencies($dependencies)
    {
        $this->dependencies = $dependencies;

        return $this;
    }

    /**
     * Get the value of relation
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Get the value of options
     */
    public function getOptions()
    {
        return $this->options;
    }

    /**
     * Get the value of hasUpdates
     */
    public function hasUpdates()
    {
        return $this->dependencies->contains("published", false);
    }


    /**
     * Get the value of timing
     */
    public function getTiming()
    {
        return $this->timing;
    }

    /**
     * Set the value of timing
     *
     * @return  self
     */
    public function setTiming($timing)
    {
        $this->timing = $timing;

        return $this;
    }
}
