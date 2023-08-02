<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Support\Facades\Redirect;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Http\Resources\Publisher\DependencyResource;
use Jkli\Cms\Publisher\Publisher;

class PublishController extends Controller
{

    function __construct(
        protected Publisher $publisher
    ) { }

    public function index()
    {

    }


    public function show(string $type, string $id)
    {
        $modelClass = Cms::getPublishable()->get($type);
        if(!$modelClass) {
            dd(Cms::getPublishable());
            abort(404, 'Publishable not found!');
        }
        $model = $modelClass::findOrFail($id);
        $dependency = $this->publisher->getDependencyTree($model);
        return DependencyResource::make($dependency);
    }

    public function publish(string $type, string $id)
    {
        $modelClass = Cms::getPublishable()->get($type);
        if(!$modelClass) {
            abort(404, 'Publishable not found!');
        }
        $model = $modelClass::findOrFail($id);
        $this->publisher->publish($model);
        return Redirect::route('publisher.index');
    }

}
