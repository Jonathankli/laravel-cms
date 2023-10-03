<?php

namespace Jkli\Cms\Publisher;

use Illuminate\Support\Collection;
use Jkli\Cms\Contracts\Publishable;
use Jkli\Cms\Enums\PublishStatus;
use Jkli\Cms\Traits\IsPublishable;

class ModelComposer implements Publishable
{   
    use IsPublishable;

    protected $name = "Model Composer";
    public $publishStatus = PublishStatus::Pending;#
    public Collection $models;

    public function __construct(
        Collection $models = null,
    ) {
        $this->models = $models ?? collect();
    }

    #[Dependency]
    public function models(): Collection
    {
        return $this->models;
    }

    public function publish() {}

    public function getPublishStatusFlag(): string
    {
        return 'publishStatus';
    }

    public function getKey(): string
    {
        return 'multiple';
    }

    public function getPublishableName(): string
    {
        return 'Multiple Models';
    }

}
