<?php

namespace Jkli\Cms;

use Illuminate\Support\ServiceProvider;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Contracts\Pluginable;
use ReflectionClass;

abstract class PluginServiceProvider extends ServiceProvider implements Pluginable
{

    protected $name;

    protected array $cmsObjects;

    protected array $cmsObjectSettings;

    protected string | null $cmsPluginExport = null;

    /**
     * Create a new service provider instance.
     *
     * @param  \Illuminate\Contracts\Foundation\Application  $app
     * @return void
     */
    public function __construct($app)
    {
        parent::__construct($app);
        $this->cmsObjects = array();
        $this->cmsObjectSettings = array();
        $this->booted(fn() => Cms::plugin($this));
    }

    public function getName(): string 
    {
        return $this->name;
    }

    public function getCmsObjects(): array 
    {
        return $this->cmsObjects;
    }

    public function getCmsObjectSettings(): array 
    {
        return $this->cmsObjectSettings;
    }

    public function withCmsComponents(?string $exportPath = "cms"): void 
    {
        $this->cmsPluginExport = $exportPath;
    }

    public function cmsObject(string | array $cmsObject): void 
    {
        if(is_array($cmsObject)) {
            $this->cmsObjects = array_merge($this->cmsObjects, $cmsObject);
            return;
        }
        array_push($this->cmsObjects, $cmsObject);
    }

    public function cmsObjectSetting(string | array $cmsObjectSetting): void 
    {
        if(is_array($cmsObjectSetting)) {
            $this->cmsObjectSettings = array_merge($this->cmsObjectSettings, $cmsObjectSetting);
            return;
        }
        array_push($this->cmsObjectSettings, $cmsObjectSetting);
    }


    public function getNpmPackageName(): string
    {
        $reflector = new ReflectionClass(get_class($this));
        $dirName = dirname($reflector->getFileName());

        $path = explode("/", $dirName);
        $pagckageJson = null;
        do {
            $dir = scandir(implode("/", $path));
            if(array_search('package.json', $dir)) {
                $pagckageJson = implode("/", $path) . "/package.json";
            } else {
                array_pop($path);
            }
        } while($pagckageJson === null || !count($path));

        if(!$pagckageJson) {
            return null;
        }

        return data_get(json_decode(file_get_contents($pagckageJson)), 'name', null);
    }

    public function getCmsPluginExport(): string | null
    {
        return $this->cmsPluginExport;
    }

}
