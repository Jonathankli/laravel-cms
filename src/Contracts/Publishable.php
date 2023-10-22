<?php

namespace Jkli\Cms\Contracts;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use Jkli\Cms\Enums\PublishStatus;

interface Publishable
{   
    public function publish(): void;
    public function publishedMode(): bool;
    public function getPublishedTable(string $baseTable): string;
    public function getExcludePublishAttributes(): array;
    public function getPublishStatusFlag(): string;
    public function getPublishStatus(): PublishStatus;
    public static function getPublishableTypeName(): string;
    public static function published(): static;
    public static function draft(): static;

}
