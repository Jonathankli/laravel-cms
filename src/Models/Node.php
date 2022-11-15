<?php

namespace Jkli\Cms\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Node extends Model
{
    use HasUuids;

    public function parent()
    {
        return $this->belongsTo(Node::class);
    }

    public function children()
    {
        return $this->hasMany(Node::class);
    }

    public static function recursiveChildren($query, ?\Closure $condition)
    {
        $baseQuery = DB::table( 'nodes' )
            ->select([ 'id' ]);

        if($condition) {
            $baseQuery = call_user_func_array(
                $condition,
                array($baseQuery)
            );
        }

        $cte = $baseQuery
            ->union(
                DB::table( 'nodes as child' )
                    ->select([ 'child.id' ])
                    ->join( 'cte', 'cte.id', '=', 'child.parent_id')
            );
        return $query->withRecursiveExpression( 'cte', $cte, ['id'] )
            ->whereIn( 'id', function( $q ) {
                return $q->select( '*' )
                    ->from( 'cte' );
            });
    }
    public function scopeWithRecursiveChildren($query, ?\Closure $condition)
    {
        return self::recursiveChildren($query, $condition);
    }
    public function getRecursiveChildren()
    {
        return self::recursiveChildren(Node::query(), fn($q) => $q->where('id', $this->id))->get();
    }


}
