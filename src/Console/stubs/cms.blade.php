@if($cms)
    import {startCms as starter} from "@jkli/cms"
@else
    import {startLive as starter} from "@jkli/cms"
@endif

const plugins = [
    @foreach ($pluginMap as $name => $package)
        require("{{$package}}"),
    @endforeach
];

starter(plugins);