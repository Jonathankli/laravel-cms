<?php

namespace Jkli\Cms\Observers;

use Jkli\Cms\Contracts\Publishable;
use Jkli\Cms\Enums\PublishStatus;
use Jkli\Cms\Facades\Cms;

class PublishObserver
{

    /**
     * Listen to the Page updating event.
     *
     * @param  $model
     * @return void
     */
    public function updating($model)
    {
        if(!$model->isDirty($model->getPublishStatusFlag()) && !Cms::isInPublishedMode()){
            $model->{$model->getPublishStatusFlag()} = PublishStatus::Pending;
        }
    }

}
