<?php

namespace Jkli\Cms\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Jkli\Cms\Contracts\Pluginable;
use Jkli\Cms\Facades\Cms;

class PluginMapCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cms:plugin-map';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $pluginMap = collect();
        foreach (Cms::getPlugins() as $plugin) {
            if(!data_get($plugin, 'noFrontentRegister', false)) {
                $pluginMap->push($this->getPluginPackageName($plugin));
            }
        }

        $map = view()->file(__DIR__."/stubs/cms.blade.php", [
            "pluginMap" => $pluginMap,
        ])->render();
        
        $path = resource_path('js');
        if(!File::exists($path)) {
            File::makeDirectory($path);
        }
        File::put("$path/cmsPluginMap.ts", $map);

        return Command::SUCCESS;
    }

    public function getPluginPackageName(Pluginable $plugin)
    {
        $cmsExportAccessor = $plugin->getCmsPluginExport();
        if(!$cmsExportAccessor) {
            return $plugin->getNpmPackageName();
        }
        return $plugin->getNpmPackageName()."/".$cmsExportAccessor;
    }
}
