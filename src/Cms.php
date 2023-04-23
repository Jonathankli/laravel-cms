<?php

namespace Jkli\Cms;

use Illuminate\Support\Collection;
use Jkli\Cms\Contracts\Pluginable;

class Cms
{

    /**
     * @var Collection<\Jkli\Cms\Contracts\Pluginable> $plugins
     */
    protected Collection $plugins;

    public function __construct()
    {
        $this->plugins = collect();
    }

    public function plugin(Pluginable $plugin)
    {
        $this->plugins->push($plugin);
        return $this;
    }

    public function getPlugins()
    {
        return $this->plugins;
    }

    public function getCmsObjects(): Collection
    {
        return $this->plugins->flatMap(
            fn ($plugin) => collect($plugin->getCmsObjects())->mapWithKeys(
                fn ($object) => [$object::type() => $object]
            )
        );
    }

    public function getCmsObjectSettings(): Collection
    {
        return $this->plugins->flatMap(
            fn ($plugin) => collect($plugin->getCmsObjectSettings())->mapWithKeys(
                fn ($object) => [$object::type() => $object]
            )
        );
    }

    public function getCmsObject(string $key): string
    {
        return $this->getCmsObjects()->get($key);
    }
}
