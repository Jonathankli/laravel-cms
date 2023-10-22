<?php

namespace Jkli\Cms;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Jkli\Cms\Contracts\Pluginable;

class Cms
{

    /**
     * @var Collection<\Jkli\Cms\Contracts\Pluginable> $plugins
     */
    protected Collection $plugins;

    /**
     * @var Collection<string,Illuminate\Database\Eloquent\Model> $plugins
     */
    protected Collection $publishable;

    protected bool $publishedMode = false;

    public function __construct()
    {
        $this->plugins = collect();
        $this->publishable = collect();
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

    public function getCmsModules(): Collection
    {
        return $this->plugins->flatMap(
            fn ($plugin) => collect($plugin->getCmsModules())->mapWithKeys(
                fn ($module) => [$module::type() => $module]
            )
        );
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
                fn ($setting) => [$setting::type() => $setting]
            )
        );
    }

    public function getCmsObject(string $key): string
    {
        return $this->getCmsObjects()->get($key);
    }

    public function registerPublishable(string | array $key, ?Model $model = null)
    {
        if(is_array($key)) {
            $this->publishable = $this->publishable->merge($key);
            return;
        }
        $this->publishable->put($key, $model);
    }

    public function getPublishable()
    {
        return $this->publishable;
    }

    public function setPublishedMode()
    {
        $this->publishedMode = true;
    }

    public function setDraftMode()
    {
        $this->publishedMode = false;
    }

    public function isInPublishedMode(): bool
    {
        return $this->publishedMode;
    }

    public function runInPublishedMode(callable $func): mixed
    {
        $prevMode = $this->isInPublishedMode();
        $this->setPublishedMode();
        $result = $func();
        $this->publishedMode = $prevMode;
        return $result;
    }

    public function runInDraftMode(callable $func): mixed
    {
        $prevMode = $this->isInPublishedMode();
        $this->setDraftMode();
        $result = $func();
        $this->publishedMode = $prevMode;
        return $result;
    }
}
