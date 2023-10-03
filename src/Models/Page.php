<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Jkli\Cms\Contracts\Publishable;
use Jkli\Cms\Publisher\Dependency;
use Jkli\Cms\Traits\HasFilter;
use Jkli\Cms\Traits\IsPublishable;
use Staudenmeir\LaravelAdjacencyList\Eloquent\Traits\HasAdjacencyList;

class Page extends Model implements Publishable
{

    use IsPublishable, HasUuids, HasFilter;
    use HasAdjacencyList {
        parent as parentParent;
    }

    /**
     * The model's attributes.
     *
     * @var array
     */
    protected $attributes = [
        "use_parent_path" => true,
    ];

    protected $searchable = [
        "name",
        "title"
    ];

    protected $fillable = [
        'name',
        'title',
        'description',
        'parent_id',
        'no_index',
        'no_follow',
        'path',
        'full_path',
        'use_parent_path',
        'node_id',
        'id',
        'shell_id',
    ];

    #[Dependency(silent: true)]
    public function rootNode()
    {
        return $this->belongsTo(CmsNode::class, 'node_id');
    }

    public function nodes()
    {
        return CmsNode::ancestorsAndSelfFrom($this->node_id);
    }

    #[Dependency(optional: true)]
    public function shell()
    {
        return $this->belongsTo(Shell::class);
    }

    #[Dependency(optional: true)]
    public function parent()
    {
        return $this->parentParent();
    }
}
