import { IconBrowser, IconPencil, IconUser } from "@tabler/icons";
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
                const pages = import.meta.glob("./pages/cms/page/**/*.js");
                return await pages[`./pages/cms/page/${name}.js`]();
            },
            icon: IconPencil,
        },
        {
            type: "users",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("./pages/cms/user/**/*.js");
                return await pages[`./pages/cms/user/${name}.js`]();
            },
            icon: IconUser
        },
    ],
}

export default coreCmsConfig;
