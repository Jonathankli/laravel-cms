import { PluginConfigLive } from "./../contexts/ConfigProvider";
import { PageOutlet } from "./../features/shell/live";

const coreConfig: PluginConfigLive = {
    name: "core",
    objects: [
        {
            name: "pageOutlet",
            Component: PageOutlet
        }
    ]
}

export default coreConfig;