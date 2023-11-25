<?php

namespace Jkli\Cms\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Jkli\Cms\Contracts\Pluginable;
use Jkli\Cms\Facades\Cms;

class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cms:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install CMS';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $installNode = $this->choice('Install node dependencies?', ['yes', 'no'], 0);

        if($installNode == 'yes') {
            $packageManager = $this->choice('Which package manager?', ['npm', 'yarn'], 0);
            if($packageManager == 'yarn') {
                $this->info('Installing node dependencies...');
                exec('yarn add @jkli/cms react react-dom');
                $this->info('Installing node dev dependencies...');
                exec('yarn add -D @vitejs/plugin-react laravel-vite-plugin vite');
            } else {
                $this->info('Installing node dependencies...');
                exec('npm install @jkli/cms react react-dom');
                $this->info('Installing node dev dependencies...');
                exec('npm install -D @vitejs/plugin-react laravel-vite-plugin vite');
            }
        } else {
            $this->info('Skipping node dependencies...');
            $this->warn('You will need to install the following dependencies: @jkli/cms react react-dom @vitejs/plugin-react laravel-vite-plugin vite');
        }

        $viteConfigJsExists = File::exists(base_path().'/vite.config.js');
        $viteConfigTsExists = File::exists(base_path().'/vite.config.ts');

        if(!$viteConfigJsExists && !$viteConfigTsExists) {
            $this->info('Creating vite.config.js...');
            $viteConfigJs = view()->file(__DIR__."/stubs/vite.config.blade.php")->render();
            File::put(base_path().'/vite.config.js', $viteConfigJs);
        } else {
            $updateViteConfig = $this->choice('Configure vite.config?', ['yes', 'no'], 0);
            if($updateViteConfig == 'yes') {
                $this->info('Updating vite.config.js...');
                $viteConfigJs = view()->file(__DIR__."/stubs/vite.config.blade.php")->render();
                File::put(base_path().'/vite.config.' . ($viteConfigJsExists ? 'js' : 'ts'), $viteConfigJs);
            }
        }

        $cmsEntryFile = view()->file(__DIR__."/stubs/cms.blade.php")->render();
        $liveEntryFile = view()->file(__DIR__."/stubs/cms.blade.php")->render();
        
        $path = resource_path('js');
        if(!File::exists($path)) {
            File::makeDirectory($path);
        }
        File::put("$path/cms.ts", $cmsEntryFile);
        File::put("$path/live.ts", $liveEntryFile);

        $this->choice('Publish cms config?', ['yes', 'no'], 0) == 'yes' && $this->call('vendor:publish', ['--tag' => 'config', '--provider' => '\Jkli\Cms\CmsServiceProvider']);

        return Command::SUCCESS;
    }

}
