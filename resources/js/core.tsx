import { PluginConfigLive } from "./contexts/ConfigProvider";
import { PageOutlet } from "./features/shell/live";

export default {
    name: "core",
    modules: [
        {
            type: "editor",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("./pages/cms/page/**/*.js");
                return await pages[`./pages/cms/page/${name}.js`]();
            }
        },
        {
            type: "users",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("./pages/cms/user/**/*.js");
                return await pages[`./pages/cms/user/${name}.js`]();
            }
        },
    ],
    objects: [
        {
            name: "pageOutlet",
            Component: PageOutlet
        }
    ]
} as PluginConfigLive;
