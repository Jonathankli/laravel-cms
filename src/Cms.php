<?php

namespace Jkli\Cms;

use Illuminate\Support\Collection;

class Cms
{

    protected Collection $plugins;

    public function __construct()
    {
        $this->plugins = collect();
    }

    public function plugin(Plugin $plugin)
    {
        $this->plugins->push($plugin);
        return $this;
    }

    public function getPlugins()
    {
        return $this->plugins;
    }
   
}
