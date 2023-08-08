<?php

namespace Jkli\Cms\Traits;

use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Observers\PublishObserver;
use Jkli\Cms\Services\Publisher;

trait IsPublishable
{   
    private bool $isPublished = false;

    /**
     * Boot the trait.
     *
     * @return void
     */
    public static function bootIsPublishable()
    {
        static::observe(new PublishObserver);
    }


    public static function getPublishableTypeName()
    {
        return get_class(new static());
    }

    public function getPublishableName()
    {
        return $this->getKey();
    }

        
    /**
     * Initialize the trait
     *
     * @return void
     */
    protected function initializeIsPublishable()
    {
        $this->isPublished = Cms::isLive();
    }

    public function publish() {
        app()->make(Publisher::class)->publish($this);
    }

    /**
     * Get the table associated with the model.
     *
     * @return string
     */
    public function getTable()
    {
        if($this->isPublished())
            return $this->getPublishedTable(parent::getTable());
        return parent::getTable();
    }

    public function getPublishedTable(string $baseTable)
    {
        return "published_" . $baseTable;
    }

    public function isPublished()
    {
        return $this->isPublished;
    }

    public function usePublished()
    {
        $this->isPublished = true;
    }

    public function useEdit()
    {
        $this->isPublished = false;
    }

    public function getExcludePublishAttributes(): array
    {
        if(isset($this->excludePublishAttributes))
            return $this->excludePublishAttributes;
        return [];
    }

    public function getPublishedFlag(): string
    {
        return "published";
    }
    
}
