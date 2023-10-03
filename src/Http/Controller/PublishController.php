<?php

namespace Jkli\Cms\Http\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Jkli\Cms\Enums\PublishStatus;
use Jkli\Cms\Facades\Cms;
use Jkli\Cms\Http\Controller\Controller;
use Jkli\Cms\Http\Resources\Publisher\DependencyResource;
use Jkli\Cms\Http\Resources\Publisher\FlattDependencyResource;
use Jkli\Cms\Http\Resources\Publisher\FlattTreeResource;
use Jkli\Cms\Http\Resources\Publisher\PublishableModelResource;
use Jkli\Cms\Http\Resources\Publisher\PublishableResource;
use Jkli\Cms\Models\DeletedPublishable;
use Jkli\Cms\Modules\Publisher as ModulesPublisher;
use Jkli\Cms\Publisher\ModelComposer;
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

            $count = $model::count();
            $publishStatusFlag = (new $model())->getPublishStatusFlag();
            $publishableType = (new $model())->deletedPublishable()->getMorphClass();

            $status = $model::select($publishStatusFlag, DB::raw('COUNT(*) as count'))
                ->groupBy($publishStatusFlag)
                ->get();

            $pendingCount = $status->where($publishStatusFlag, PublishStatus::Pending)->first()?->count ?? 0;
            $publishedCount = $status->where($publishStatusFlag, PublishStatus::Published)->first()?->count ?? 0;
            $draftCount = $status->where($publishStatusFlag, PublishStatus::Draft)->first()?->count ?? 0;
            $deletedCount = DeletedPublishable::where('publishable_type', $publishableType)->count();
            
            $models->push((object) [
                'publishedCount' => $publishedCount,
                'count' => $count,
                'pendingCount' => $pendingCount,
                'deletedCount' => $deletedCount,
                'draftCount' => $draftCount,
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

    public function showMultiple(string $type, Request $request)
    {
        $modelClass = Cms::getPublishable()->get($type);
        if(!$modelClass) {
            abort(404, 'Publishable not found!');
        }
        $ids = $request->input('ids', []);
        $models = $modelClass::findMany($ids);
        $publishable = new ModelComposer($models);
        $dependency = $this->publisher->getDependencyTree($publishable);
        $falttened = $this->publisher->flattenTree($dependency);

        return Inertia::render(ModulesPublisher::view('Show'), [
            'publishable' => fn() => PublishableResource::make((object) [
                'name' => $modelClass::getPublishableTypeName(),
                'type' => $type,
            ]),
            'rootResource' => fn() => FlattDependencyResource::make($dependency),
            'flatTree' => fn() => FlattTreeResource::collection($falttened)->all(),
            'model' => fn() => PublishableModelResource::make($publishable),
            'publishIds' => $ids,
        ]);
    }

    public function publishMultiple(string $type, Request $request)
    {
        $modelClass = Cms::getPublishable()->get($type);
        if(!$modelClass) {
            abort(404, 'Publishable not found!');
        }
        $ids = $request->input('ids', []);
        $models = $modelClass::findMany($ids);
        $publishable = new ModelComposer($models);
        $this->publisher->publish($publishable, $request->input('optionals', []));
        return Redirect::route('publisher.index');
    }

}
