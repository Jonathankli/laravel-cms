<?php

namespace Jkli\Cms\Traits;

trait HasFilter
{

    protected $defaultLimit = 25;

    public function scopeFilter($query)
    {
        if(request()->has('search')) {
            $query->where(function($query) {
                $this->recursiveSearch($query, $this->searchable, request()->input('search'));
            });
        }
        if(request()->has('sort')) {
            $query->orderBy(request()->input('sort'), request()->input('sortDirection', 'asc'));
        }

        $limit = request()->input('limit', $this->defaultLimit);
        return $query->paginate($limit);
    }

    protected function recursiveSearch($query, $searchables, $keyword)
    {
        if(!$searchables || !count($searchables)) {
            return;
        }
        foreach ($searchables as $key => $field) {
            if(is_array($field)) {
                $query->orWhereHas($key, function($query) use ($field, $keyword) {
                    $query->where(function($query) use ($field, $keyword) {
                    	$this->recursiveSearch($query, $field, $keyword);
                    });
                });
                continue;
            }
            $query->orWhere($field, 'LIKE', "%".$keyword."%");
        }
    }
}
