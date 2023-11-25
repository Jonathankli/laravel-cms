import { IconBoxMargin, IconBrowser, IconDashboard, IconFolder, IconPencil, IconRocket, IconSitemap, IconUser } from "@tabler/icons";
import { ExtendedPluginConfig } from "../contexts/ConfigProvider";
import coreConfig from "./core";
import { Media } from "../features/media/cmsObjectSettings/Media";

const coreCmsConfig: ExtendedPluginConfig= {
    extend: coreConfig,
    objectSettings: [
        {
            name: 'media',
            Component: Media,
        }
    ],
    modules: [
        {
            type: "admin",
            icon: IconDashboard,
        },
        {
            type: "live_server",
            icon: IconBrowser
        },
        {
            type: "editor",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("../features/editor/pages/**/*.js");
                return await pages[`../features/editor/pages/${name}.js`]();
            },
            icon: IconPencil,
        },
        {
            type: "publisher",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("../features/publisher/pages/**/*.js");
                return await pages[`../features/publisher/pages/${name}.js`]();
            },
            icon: IconRocket,
        },
        {
            type: "pages",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("../features/page/pages/**/*.js");
                return await pages[`../features/page/pages/${name}.js`]();
            },
            icon: IconSitemap
        },
        {
            type: "shells",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("../features/shell/pages/**/*.js");
                return await pages[`../features/shell/pages/${name}.js`]();
            },
            icon: IconBoxMargin
        },
        {
            type: "media",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("../features/media/pages/**/*.js");
                return await pages[`../features/media/pages/${name}.js`]();
            },
            icon: IconFolder
        },
        {
            type: "users",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("../features/user/pages/**/*.js");
                return await pages[`../features/user/pages/${name}.js`]();
            },
            icon: IconUser
        },
    ],
}

export default coreCmsConfig;
