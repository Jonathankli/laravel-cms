<?php

/*
 * You can place your custom package configuration in here.
 */
return [

    'cms_path' => '/cms',
    'admin_path' => '/cms/admin',
    'live_path' => '/',

    'cms_param_base' => '_cms',

    'media' => [
        'disk' => 'public',
        'public_path' => config('app.url') . '/storage/media',
        'storage_path' => 'media',
    ],

];