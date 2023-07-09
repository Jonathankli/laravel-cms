<?php

namespace Jkli\Cms\Http\Controller;

use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Jkli\Cms\Contracts\Node;
use Jkli\Cms\Http\Requests\ResourceFilterRequest;
use Jkli\Cms\Http\Requests\User\UserUpdateRequest;
use Jkli\Cms\Http\Resources\UserResource;
use Jkli\Cms\Models\User;
use Jkli\Cms\Modules\Users;

class TestController extends Controller
{

    public function index(Node $node)
    {
        dd($node);
    }

}
