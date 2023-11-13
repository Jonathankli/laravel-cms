<?php

namespace Jkli\Cms;

use Illuminate\Support\Collection;
use Jkli\Cms\Models\CmsNode;

abstract class Setting
{
    protected static string $type;
    
    protected static string $component;
    
    protected Collection $rules;

    protected mixed $default = null;

    protected bool $optimistic = true;

    protected bool $disableServersideValidation;

    protected Collection $metas;

    public function __construct(
        protected string $title, 
        protected string $name
    ) {
        $this->metas = collect();
        $this->rules = collect();
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
    public function rules(array|string $rules)
    {
        $this->rules = $this->rules->merge(func_get_args());
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
     * Sets the default value of the setting
     *
     * @param  mixed   $value
     * @return $this
     */
    public function optimistic($optimistic = true)
    {
        $this->optimistic = $optimistic;
        return $this;
    }
 
    /**
     * Allows the input to communicate with the server
     *
     * @param          $payload from client
     * @return mixed   $response
     */
    public function serverData(mixed $payload)
    {
        return null;
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
     * Get the value from the node
     * 
     * @return mixed $name 
     */
    public function getValue(CmsNode $node): mixed
    {
        return data_get($node->settings, $this->getName(), $this->getDefault());
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
     * Get the default value
     * 
     * @return mixed $name 
     */
    public function getOptimistic(): bool
    {
        return $this->optimistic;
    }

    /**
     * Dsables the live validation for rules and serverside data
     * 
     * @return mixed $name 
     */
    public function disableServersideValidation(bool $disableServersideValidation = true)
    {
        $this->disableServersideValidation = $disableServersideValidation;
        return $this;
    }

    /**
     * -------------- STATIC GETTER --------------
     */

    /**
     * Does the setting need serversideValidation?
     * 
     * @return bool $serversideValidation 
     */
    public function serversideValidation(): bool
    {
        $reflector = new \ReflectionMethod($this, 'getValue');
        $overwrittenGetValueFunction = ($reflector->getDeclaringClass()->getName() === static::class);

        return isset($this->disableServersideValidation) 
            ? !$this->disableServersideValidation
            : $overwrittenGetValueFunction || !$this->rules->isEmpty();
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
