<?php

namespace Jkli\Cms\Contracts;

interface Publishable
{   
    public function publish();
    public function isPublished();
    public static function usePublished();
    public function useEdit();
    public function useLive();
    public function getPublishedTable(string $baseTable);
    public function getExcludePublishAttributes(): array;
    public function getPublishedFlag(): string;

}
