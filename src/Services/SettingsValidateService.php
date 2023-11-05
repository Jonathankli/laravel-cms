<?php

namespace Jkli\Cms\Services;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Jkli\Cms\Models\CmsNode;

class SettingsValidateService
{

    public static function validateSettings(CmsNode $node)
    {
        $object = $node->getObjectInstance();

        $rules = collect($object->settings())->mapWithKeys(function($setting) use ($node) {
            return [$setting->getName() => $setting->getRules()];
        })->filter(fn($rules) => count($rules));

        $validator = Validator::make($object->settingData(), $rules->toArray());

        if($validator->fails()) {
            throw new ValidationException($validator, null, 'objectEditor');
        }
    }

    public static function validateEditNodeSettings()
    {
        $node = EditNodeService::getEditNode();

        if(!$node) {
            return;
        }

        if(Session::get('errors')?->getBag('objectEditor')) {
            return;
        }
        
        self::validateSettings($node);
    }

    

}
