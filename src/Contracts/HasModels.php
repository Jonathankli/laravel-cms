<?php

namespace Jkli\Cms\Contracts;

use Illuminate\Support\Collection;
use Jkli\Cms\Models\CmsNode;

interface HasModels
{   
    public function getModelIds(CmsNode $node): null|string|Collection;
    public function getModelType(): string;
    public function getModelKey(): string;
    public function getResource(): string;
}
