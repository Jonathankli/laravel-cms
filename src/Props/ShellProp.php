<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Jkli\Cms\Http\Resources\NodeResource;
use Jkli\Cms\Http\Resources\PageResource;
use Jkli\Cms\Http\Resources\ShellResource;
use Jkli\Cms\Models\Page;
use Jkli\Cms\Models\Shell;

class ShellProp extends Prop
{

    function __construct(
        protected Request $request
    ) {}

    public function handle(Collection $props, Closure $next)
    {
        $props->put('shell', fn() => ShellResource::make($this->getShell()));
        return $next($props);
    }

    public function getShell()
    {
        $shellId = $this->request->route('shell');
        $shell = Shell::findOrFail($shellId);
        return $shell;
    }

}
 