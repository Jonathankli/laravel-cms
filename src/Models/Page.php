<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Jkli\Cms\Contracts\Publishable;
use Jkli\Cms\Publisher\Dependency;
use Jkli\Cms\Traits\IsPublishable;
use Staudenmeir\LaravelAdjacencyList\Eloquent\Traits\HasAdjacencyList;

class Page extends Model implements Publishable
{

    use IsPublishable, HasUuids, HasAdjacencyList;

    /**
     * The model's attributes.
     *
     * @var array
     */
    protected $attributes = [
        "use_parent_path" => true,
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

    public function rootNode()
    {
        return $this->belongsTo(CmsNode::class, 'node_id');
    }

    #[Dependency(silent: true)]
    public function nodes()
    {
        return $this->rootNode->descendantsAndSelf();
    }

    #[Dependency(optional: true)]
    public function shell()
    {
        return $this->belongsTo(Shell::class);
    }
}
