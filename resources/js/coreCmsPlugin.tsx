import { IconBrowser, IconPencil, IconSitemap, IconUser } from "@tabler/icons";
import { ExtendedPluginConfig } from "./contexts/ConfigProvider";
import coreConfig from "./corePlugin";

const coreCmsConfig: ExtendedPluginConfig= {
    extend: coreConfig,
    modules: [
        {
            type: "live_server",
            icon: IconBrowser
        },
        {
            type: "editor",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("./pages/cms/Editor/**/*.js");
                return await pages[`./pages/cms/Editor/${name}.js`]();
            },
            icon: IconPencil,
        },
        {
            type: "pages",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("./pages/cms/Page/**/*.js");
                return await pages[`./pages/cms/Page/${name}.js`]();
            },
            icon: IconSitemap
        },
        {
            type: "users",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("./pages/cms/User/**/*.js");
                return await pages[`./pages/cms/User/${name}.js`]();
            },
            icon: IconUser
        },
    ],
}

export default coreCmsConfig;
