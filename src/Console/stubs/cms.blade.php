@if($cms)
    import {startCms as starter} from "@jkli/cms"
@else
    import {startLive as starter} from "@jkli/cms"
@endif

const plugins = [
    @foreach ($pluginMap as $name => $package)
        "{{$name}}": require("{{$package}}"),
    @endforeach
];

starter(plugins);