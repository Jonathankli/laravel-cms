@if($cms)
    import {startCms as starter} from "@jkli/cms"
@else
    import {startLive as starter} from "@jkli/cms"
@endif

const plugins = [
    @foreach ($plugins as $plugin)
        require({{$plugin}})
    @endforeach
];

starter(plugins);