<?php

namespace Jkli\Cms\Observers;

use Jkli\Cms\Contracts\Publishable;

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
        if(!$model->isDirty($model->getPublishedFlag())){
            $model->{$model->getPublishedFlag()} = false;
        }

    }

}
