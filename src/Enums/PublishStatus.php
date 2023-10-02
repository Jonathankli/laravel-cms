<?php
namespace Jkli\Cms\Enums;

enum PublishStatus: string
{
    case Published = 'published';
    case Pending = 'pending';
    case Draft = 'draft';
}