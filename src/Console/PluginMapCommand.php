<?php

namespace Jkli\Cms\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class PluginMapCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cms:create-plugin-map';

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
        $map = view()->file(__DIR__."/stubs/cms.blade.php", [
            'cms' => true,
            'plugins' => []
        ])->render();
        
        $path = resource_path('js/cms');
        if(!File::exists($path)) {
            File::makeDirectory($path);
        }
        File::put("$path/cms.ts", $map);

        return Command::SUCCESS;
    }
}
