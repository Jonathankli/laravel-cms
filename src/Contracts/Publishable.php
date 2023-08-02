<?php

namespace Jkli\Cms\Contracts;

interface Publishable
{   
    public function publish();
    public function isPublished();
    public function usePublished();
    public function useEdit();
    public function getPublishedTable(string $baseTable);
    public function getExcludePublishAttributes(): array;
    public function getPublishedFlag(): string;

}
