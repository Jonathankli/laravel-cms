<?php

namespace Jkli\Cms\Observers;

use Jkli\Cms\Enums\PublishStatus;
use Jkli\Cms\Models\CmsNode;

class CmsNodeObserver
{

      /**
     * Listen to the Page updating event.
     *
     * @param  $model
     * @return void
     */
    public function updating(CmsNode $model)
    {
        if(!$model->isDirty($model->getPublishStatusFlag())){
            $model->rootAncestor->page->{$model->getPublishStatusFlag()} = PublishStatus::Pending;
            $model->rootAncestor->page->save();
        }
    }

    /**
     * Handle the "deleted" event.
     */
    public function deleted(CmsNode $model): void
    {
        $model->rootAncestor->page->{$model->getPublishStatusFlag()} = PublishStatus::Pending;
        $model->rootAncestor->page->save();
    }
}
