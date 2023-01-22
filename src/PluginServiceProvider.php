<?php

namespace Jkli\Cms;

use Illuminate\Support\ServiceProvider;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Contracts\Pluginable;

abstract class PluginServiceProvider extends ServiceProvider implements Pluginable
{

    protected $name;

    protected array $cmsObjects;

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

    public function cmsObject(string | array $cmsObject): void 
    {
        if(is_array($cmsObject)) {
            $this->cmsObjects = array_merge($this->cmsObjects, $cmsObject);
            return;
        }
        array_push($this->cmsObjects, $cmsObject);
    }

}
