<?php

namespace Jkli\Cms;

use Jkli\Cms\Models\Node;

abstract class CmsObject
{

    protected static int $maxCacheTime = 1080; // 3 hours

    protected static string $type;

    protected static string $component;

    protected static string $name;

    protected static string $group = "General";

    public function __construct(protected Node $node) { }

    /**
     * Defines the settings for the object
     * 
     * @return array $settings 
     */
    public function settings(): array
    {
        return [];
    }

    /**
     * Generate data on the serverside
     * 
     * @return mixed $data 
     */
    public function getServersideData(): mixed
    {
        return [];
    }


    /**
     * Gets the setting data from the node
     * 
     * @return array $settings 
     */
    public function settingData(): array
    {
        return collect($this->settings())->mapWithKeys(function($setting) {
            $name = $setting->getName();
            if(isset($this->node->settings[$name])) {
                return [$name => $this->node->settings[$name]];
            }
            return [$name => $setting->getDefault()];
        })->toArray();
    }

    /**
     * -------------- GETTER --------------
     */

    /**
     * Get the duration the data should be cached.
     * 
     * @return int $seconds 
     */
    public static function maxCacheTime(): int
    {
        return static::$maxCacheTime;
    }

    /**
     * Get the groupname of the object
     * 
     * @return sting $groupName 
     */
    public static function group(): string
    {
        return static::$group;
    }

    /**
     * Get the name of the object
     * 
     * @return sting $name 
     */
    public static function name(): string
    {
        return static::$name;
    }

    /**
     * Get the type of the object
     * 
     * @return sting $name 
     */
    public static function type(): string
    {
        if(isset(static::$type)) {
            return static::$type;
        }
        return get_called_class();
    }

    /**
     * Get the fronten component name of the object
     * 
     * @return sting $name 
     */
    public static function component(): string
    {
        return static::$component;
    }

    /**
     * Get the node of the object
     * 
     * @return Node $node 
     */
    public function getNode(): Node
    {
        return $this->node;
    }
  
}
