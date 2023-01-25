<?php

namespace Jkli\Cms\Contracts;

interface Pluginable
{   
    /**
     * Getter
     */
    public function getName(): string;
    public function getCmsObjects(): array;
    public function getNpmPackageName(): string;
    public function getCmsPluginExport(): string | null;
}
