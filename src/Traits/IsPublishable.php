<?php

namespace Jkli\Cms\Traits;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use Jkli\Cms\Enums\PublishStatus;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Models\DeletedPublishable;
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
        return (new \ReflectionClass(new static()))->getShortName();
    }

    public function getPublishableName()
    {
        return $this->name;
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

    public static function usePublished(): self
    {
        $instance = new self();
        $instance->useLive();
        return $instance;
    }

    public function useEdit()
    {
        $this->isPublished = false;
    }

    public function useLive()
    {
        $this->isPublished = true;
    }

    public function getExcludePublishAttributes(): array
    {
        if(isset($this->excludePublishAttributes))
            return $this->excludePublishAttributes;
        return [];
    }

    public function getPublishStatusFlag(): string
    {
        return "publish_status";
    }

    public function deletedPublishable(): MorphMany
    {
        return $this->morphMany(DeletedPublishable::class, 'publishable');
    }

    /**
     * Get the casts array.
     *
     * @return array
     */
    public function getCasts()
    {
        $casts = parent::getCasts();
        return array_merge($casts, [
            $this->getPublishStatusFlag() => PublishStatus::class
        ]);
    }
    
}
