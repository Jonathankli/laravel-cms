<?php

namespace Jkli\Cms;

use Jkli\Cms\Models\Node;

abstract class CmsObjectSetting
{
    
    protected string $component;

    protected mixed $default = null;

    protected array $rules = array();

    private function __construct(protected string $label, protected string $name) { }

    /**
     * Generates a object field instance 
     * @param string $label
     * @param string $name
     * 
     * @return $this
     */
    public static function make(string $label, string $name)
    {
        $object = new CmsObjectSetting($label, $name);
        return $object;
    }


    /**
     * Value taht will be pased to the object 
     * @param \Jkli\Cms\Models\Node $node
     * 
     * @return sting $groupName 
     */
    public function value(Node $node): mixed
    {
        return data_get($node->settings, $this->name, $this->default());
    }

    /**
     * Rules to validate the value
     * @param \Jkli\Cms\Models\Node $node
     * 
     * @return sting $groupName 
     */
    public function rules(): array
    {
        return $this->rules;
    }

    /**
     * Adds a rules to the field
     * 
     * @return void 
     */
    protected function addRule(string | array $rule)
    {
        if(is_array($rule)) {
            $this->rules = array_merge($this->rules, $rule);
            return;
        }
        array_push($this->rules, $rule);
        return $this;
    }


    /**
     * Get the name of the input
     * 
     * @return sting $groupName 
     */
    public function name(): string
    {
        return $this->name;
    }

    /**
     * Get the frontend component name
     * 
     * @return sting $groupName 
     */
    public function component(): string
    {
        return $this->component;
    }

    /**
     * Get the frontend component name
     * @param \Jkli\Cms\Models\Node $node
     * 
     * @return sting $groupName 
     */
    public function default()
    {
        return $this->default;
    }

}
