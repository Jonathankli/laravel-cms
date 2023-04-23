<?php

namespace Jkli\Cms;

use Illuminate\Support\Collection;

abstract class Setting
{
    protected static string $type;
    
    protected static string $component;
    
    protected static bool $serversideValidation = false;
    
    protected array|string $rules;

    protected mixed $default = null;

    protected Collection $metas;

    public function __construct(
        protected string $title, 
        protected string $name
    ) {
        $this->metas = collect();
     }

    /**
     * Creates a setting object
     *
     * @return static
     */
    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }

 
    /**
     * Set the validation rules for the setting.
     *
     * @param  array|string  $rules
     * @return $this
     */
    public function rules($rules)
    {
        $this->rules = func_get_args();
        return $this;
    }
 
    /**
     * Adds meta information passed to the frontend
     *
     * @param  string  $key
     * @param  mixed   $value
     * @return $this
     */
    public function addMeta($key, $value)
    {
        $this->metas->put($key, $value);
        return $this;
    }
 
    /**
     * Sets the default value of the setting
     *
     * @param  mixed   $value
     * @return $this
     */
    public function default($value)
    {
        $this->default = $value;
        return $this;
    }

    /**
     * -------------- GETTER --------------
     */

    /**
     * Get the validation rules for this field.
     *
     * @return array
     */
    public function getRules()
    {
        return $this->rules;
    }


    /**
     * Get the name of the setting
     * 
     * @return string $name 
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Get the title of the object
     * 
     * @return string $name 
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * Get the metas of the object
     * 
     * @return string $name 
     */
    public function getMetas(): Collection
    {
        return $this->metas;
    }

    /**
     * Get the default value
     * 
     * @return mixed $name 
     */
    public function getDefault(): mixed
    {
        return $this->default;
    }

    /**
     * -------------- STATIC GETTER --------------
     */

    /**
     * Does the setting need servervalidation?
     * 
     * @return bool $serversideValidation 
     */
    public static function serversideValidation(): bool
    {
        return static::$serversideValidation;
    }

    /**
     * Get the type of the setting
     * 
     * @return string $name 
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
     * @return string $name 
     */
    public static function component(): string
    {
        return static::$component;
    }
  
}
