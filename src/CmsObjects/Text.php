<?php

namespace Jkli\Cms\CmsObjects;

use Jkli\Cms\CmsObject;
use Jkli\Cms\Settings\Text as SettingsText;

class Text extends CmsObject
{
    
    protected static string $name = "Text";

    protected static string $group = "Defaults";

    protected static string $component = "text";

    /**
     * Defines the settings for the object
     * 
     * @return array $settings 
     */
    public function settings(): array
    {
        return [
            SettingsText::make("Name", "name")
        ];
    }

}
