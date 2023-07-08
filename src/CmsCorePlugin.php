<?php

namespace Jkli\Cms;

use Jkli\Cms\Contracts\Pluginable;
use Jkli\Cms\Modules\Editor;
use Jkli\Cms\Modules\LiveServer;
use Jkli\Cms\Modules\Users;
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
    
        public function getCmsModules(): array 
        {
            return [
                LiveServer::class,
                Editor::class,
                Users::class,
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
