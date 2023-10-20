<?php

namespace Jkli\Cms\Observers;

use Jkli\Cms\Models\Page;
use Jkli\Cms\Services\PagePathService;

class PageObserver
{

    public function __construct(protected PagePathService $pathService) {}

    /**
     * Listen to the Page creating event.
     *
     * @param  \Jkli\Cms\Models\Page $page
     * @return void
     */
    public function creating(Page $page)
    {
        $page->full_path = $this->pathService->getPagePath($page);
    }

    /**
     * Handle the Page "created" event.
     *
     * @param  \Jkli\Cms\Models\Page $page
     * @return void
     */
    public function created(Page $page)
    {
        
    }

    /**
     * Listen to the Page updating event.
     *
     * @param  \Jkli\Cms\Models\Page $page
     * @return void
     */
    public function updating(Page $page)
    {
        if($page->isDirty('path') || $page->isDirty('use_parent_path') || $page->isDirty('parent_id')){
            $page->full_path = $this->pathService->getPagePath($page);
        }
    }

 
    /**
     * Handle the Page "updated" event.
     *
     * @param  \Jkli\Cms\Models\Page $page
     * @return void
     */
    public function updated(Page $page)
    {
        //
    }
 
    /**
     * Handle the Page "deleted" event.
     *
     * @param  \Jkli\Cms\Models\Page $page
     * @return void
     */
    public function deleted(Page $page)
    {
        //
    }
 
    /**
     * Handle the Page "restored" event.
     *
     * @param  \Jkli\Cms\Models\Page $page
     * @return void
     */
    public function restored(Page $page)
    {
        //
    }
 
    /**
     * Handle the Page "forceDeleted" event.
     *
     * @param  \Jkli\Cms\Models\Page $page
     * @return void
     */
    public function forceDeleted(Page $page)
    {
        //
    }
}
