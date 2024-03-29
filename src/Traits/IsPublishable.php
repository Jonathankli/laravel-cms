<?php

namespace Jkli\Cms\Traits;

use Jkli\Cms\Enums\PublishStatus;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Observers\PublishObserver;
use Jkli\Cms\Services\Publisher;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\SoftDeletingScope;

trait IsPublishable
{   
    use SoftDeletes {
        performDeleteOnModel as performDeleteOnModelSoftDelete;
    }

    private bool $publishedMode = false;

    private string $draftTable;

    /**
     * Boot the trait.
     *
     * @return void
     */
    public static function bootIsPublishable()
    {
        static::observe(new PublishObserver);
    }
            
    /**
     * Initialize the trait
     *
     * @return void
     */
    protected function initializeIsPublishable()
    {
        Cms::isInPublishedMode()
            ? $this->bootPublished()
            : $this->bootDraft();
    }

    public function publish(): void
    {
        app()->make(Publisher::class)->publish($this);
    }

    /**
     * Boots into the publish mode.
     *
     * @return void
     */
    protected function bootPublished(): void
    {
        $this->publishedMode = true;
        $this->draftTable = parent::getTable();
        $this->table = $this->getPublishedTable($this->draftTable);
        if(static::hasGlobalScope(SoftDeletingScope::class)) {
            unset(static::$globalScopes[static::class][SoftDeletingScope::class]);
        }
    }

    /**
     * Boots into the deaft mode.
     *
     * @return void
     */
    protected function bootDraft(): void
    {
        $this->publishedMode = false;
        if(isset($this->draftTable)) {
            $this->table = $this->draftTable;
        }
        if(!$this->hasGlobalScope(SoftDeletingScope::class)) {
            static::addGlobalScope(new SoftDeletingScope);
        }
    }

    public function publishedMode(): bool
    {
        return $this->publishedMode;
    }

    public function getPublishableName(): string
    {
        return $this->name ?? $this->getKey();
    }

    public static function getPublishableTypeName():string
    {
        return (new \ReflectionClass(new static()))->getShortName();
    }

    public function getPublishedTable(string $baseTable): string
    {
        return "published_" . $baseTable;
    }

    public static function published(): static
    {
        $instance = new static();
        $instance->bootPublished();
        return $instance;
    }

    public static function draft(): static
    {
        $instance = new static();
        $instance->bootDraft();
        return $instance;
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

    public function getPublishStatus(): PublishStatus
    {
        return $this->{$this->getPublishStatusFlag()};
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

    /**
     * Perform the actual delete query on this model instance.
     *
     * @return mixed
     */
    protected function performDeleteOnModel()
    {
        if ($this->getPublishStatus() === PublishStatus::Draft) {
            $this->forceDeleting = true;
        }

        return $this->performDeleteOnModelSoftDelete();
    }
    
}
