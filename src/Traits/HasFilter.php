<?php

namespace Jkli\Cms\Traits;

trait HasFilter
{

    protected $defaultLimit = 25;

    public function scopeFilter($query)
    {
        if(request()->has('search')) {
            $query->where(function($query) {
                foreach ($this->searchable as $field) {
                    $query->orWhere($field, 'LIKE', "%".request()->input('search')."%");
                }
            });
        }
        if(request()->has('sort')) {
            $query->orderBy(request()->input('sort'), request()->input('sortDirection', 'asc'));
        }

        $limit = request()->input('limit', $this->defaultLimit);
        return $query->paginate($limit);
    }
}
