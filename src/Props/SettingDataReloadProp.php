<?php

namespace Jkli\Cms\Props;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Jkli\Cms\Services\EditNodeService;
use Jkli\Cms\Setting;

class SettingDataReloadProp extends Prop
{

    function __construct(protected Request $request) { }

    public function handle(Collection $props, Closure $next)
    {
        $node = EditNodeService::getEditNode(); 
        $settingDataRequest = $this->request->header('X-CMS-Setting-Data-Request');

        if(!$node || !$settingDataRequest) {
            return $next($props);
        }

        $settingDataRequest = json_decode($settingDataRequest, true);
        $settingName = data_get($settingDataRequest, 'setting');
        $payload = data_get($settingDataRequest, 'payload', null);

        $object = $node->getObjectInstance();

        if(!$object) {
            return $next($props);
        }

        $setting = collect($object->settings())->first(function(Setting $setting) use ($settingName) {
            return $setting->getName() === $settingName;
        });

        $props->put('settingServerData', [
            'name' => $setting->getName(),
            'data' => $setting->serverData($payload),
        ]);

        return $next($props);
    }

}
 