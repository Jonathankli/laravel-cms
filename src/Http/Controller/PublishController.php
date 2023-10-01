<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Http\Resources\Publisher\DependencyResource;
use Jkli\Cms\Http\Resources\Publisher\FlattDependencyResource;
use Jkli\Cms\Http\Resources\Publisher\FlattTreeResource;
use Jkli\Cms\Http\Resources\Publisher\PublishableModelResource;
use Jkli\Cms\Http\Resources\Publisher\PublishableResource;
use Jkli\Cms\Modules\Publisher as ModulesPublisher;
use Jkli\Cms\Publisher\Publisher;

class PublishController extends Controller
{

    function __construct(
        protected Publisher $publisher
    ) { }

    public function dashboard()
    {
        $modelClasses = Cms::getPublishable();

        $models = collect();
        foreach($modelClasses as $type => $model) {
            $publishedCount = $model::usePublished()->count();
            $count = $model::count();
            $notLiveCount = $model::where((new $model())->getPublishedFlag(), false)->count();
            $deletedCount = 0; //TODO
            $models->push((object) [
                'publishedCount' => $publishedCount,
                'count' => $count,
                'pendingCount' => $notLiveCount + $deletedCount,
                'name' => $model::getPublishableTypeName(),
                'type' => $type,
            ]);
        }

        return Inertia::render(ModulesPublisher::view('Dashboard'), [
            'publishables' => fn() => PublishableResource::collection($models)->all(),
        ]);
    }

    public function index(string $type)
    {
        $modelClass = Cms::getPublishable()->get($type);
        if(!$modelClass) {
            abort(404, 'Publishable not found!');
        }

        return Inertia::render(ModulesPublisher::view('Index'), [
            'publishable' => fn() => PublishableResource::make((object) [
                'name' => $modelClass::getPublishableTypeName(),
                'type' => $type,
            ]),
            'models' => PublishableModelResource::collection($modelClass::filter()),
        ]);
    }


    public function show(string $type, string $id)
    {
        $modelClass = Cms::getPublishable()->get($type);
        if(!$modelClass) {
            abort(404, 'Publishable not found!');
        }
        $model = $modelClass::findOrFail($id);
        $dependency = $this->publisher->getDependencyTree($model);
        $falttened = $this->publisher->flattenTree($dependency);
        return Inertia::render(ModulesPublisher::view('Show'), [
            'publishable' => fn() => PublishableResource::make((object) [
                'name' => $modelClass::getPublishableTypeName(),
                'type' => $type,
            ]),
            'rootResource' => fn() => FlattDependencyResource::make($dependency),
            'flatTree' => fn() => FlattTreeResource::collection($falttened)->all(),
            'model' => fn() => PublishableModelResource::make($model),
        ]);
    }

    public function publish(string $type, string $id, Request $request)
    {
        $modelClass = Cms::getPublishable()->get($type);
        if(!$modelClass) {
            abort(404, 'Publishable not found!');
        }
        $model = $modelClass::findOrFail($id);
        $this->publisher->publish($model, $request->input('optionals', []));
        return Redirect::route('publisher.index');
    }

}
