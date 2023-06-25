import { PluginConfigLive } from "./contexts/ConfigProvider";
import { PageOutlet } from "./features/shell/live";

export default {
    name: "core",
    objects: [
        {
            name: "pageOutlet",
            Component: PageOutlet
        }
    ]
} as PluginConfigLive;
