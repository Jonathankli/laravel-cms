<?php

namespace Jkli\Cms;

use Illuminate\Support\Collection;

class Plugin
{

    protected string $name;
    protected string $packageBasePath;

    private function __construct(string $name, string $packageBasePath)
    {
        $this->name = $name;
        $this->packageBasePath = $packageBasePath;
    }

    public static function make(string $name, string $packageBasePath)
    {
        $plugin = new Plugin($name, $packageBasePath);
        return $plugin;
    }

    public function getPackageBasePath()
    {
        return $this->packageBasePath;
    }
   
}
