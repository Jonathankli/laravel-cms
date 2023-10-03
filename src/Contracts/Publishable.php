<?php

namespace Jkli\Cms\Contracts;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use Jkli\Cms\Enums\PublishStatus;

interface Publishable
{   
    public function publish();
    public function usesPublishedTable();
    public static function usePublished();
    public function useEdit();
    public function useLive();
    public function getPublishedTable(string $baseTable);
    public function getExcludePublishAttributes(): array;
    public function getPublishStatusFlag(): string;
    public function deletedPublishable(): MorphMany;

}
