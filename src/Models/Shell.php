<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Jkli\Cms\Contracts\Publishable;
use Jkli\Cms\Publisher\Dependency;
use Jkli\Cms\Traits\HasFilter;
use Jkli\Cms\Traits\IsPublishable;

class Shell extends Model implements Publishable
{

    use HasUuids, IsPublishable, HasFilter;

    protected $fillable = [
        'id',
        'node_id',
        'name'
    ];

    public function pages()
    {
        return $this->hasMany(Page::class);
    }

    public function rootNode()
    {
        return $this->belongsTo(CmsNode::class, 'node_id');
    }

    #[Dependency(silent: true )]
    public function nodes()
    {
        return CmsNode::ancestorsAndSelfFrom($this->node_id);
    }

}
