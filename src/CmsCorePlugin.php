<?php

namespace Jkli\Cms;

use Jkli\Cms\Contracts\Pluginable;
use Jkli\Cms\Objects\PageOutlet;

class CmsCorePlugin implements Pluginable
{
    
        public function getName(): string 
        {
            return "core";
        }
    
        public function getCmsObjects(): array 
        {
            return [
                PageOutlet::class
            ];
        }
    
        public function getNpmPackageName(): string | null 
        {
            return null;
        }
    
        public function getCmsPluginExport(): ?string
        {
            return null;
        }
    
        public function getCmsObjectSettings(): array
        {
            return [];
        }
}
