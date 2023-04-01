@foreach ($pluginMap as $index => $package)
import plugin{{$index}} from "{{$package}}"
@endforeach

const plugins = [
@foreach ($pluginMap as $index => $package)
    plugin{{$index}},
@endforeach
];

export default plugins;