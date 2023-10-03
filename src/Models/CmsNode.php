<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Jkli\Cms\Contracts\Node;
use Jkli\Cms\Contracts\Publishable;
use Jkli\Cms\Publisher\Dependency;
use Jkli\Cms\Traits\IsPublishable;
use Staudenmeir\LaravelAdjacencyList\Eloquent\HasRecursiveRelationships;

class CmsNode extends Model implements Node, Publishable
{
    use HasUuids, 
        IsPublishable;
    use HasRecursiveRelationships {
        children as protected parentChildren;
    }

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "nodes";

    protected $casts = [
        'settings' => 'array',
    ];

    protected $fillable = [
        'settings',
        'type',
        'index',
        'parent_id',
        'outlet',
        'id',
    ];

    public function page()
    {
        return $this->hasOne(Page::class, 'node_id');
    }
    
    public function shell()
    {
        return $this->hasOne(Shell::class, 'node_id');
    }

    #[Dependency(silent: true)]
    public function children() 
    {
        return $this->parentChildren();
    }

    public static function ancestorsAndSelfFrom($nodeId) 
    {
        return self::treeOf(fn($query) => $query->where('id', $nodeId))->breadthFirst();
    }

}
