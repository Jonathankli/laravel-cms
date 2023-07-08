import React from "react";
import ReactDOM from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import GlobalProviders from "./contexts/GlobalProvider";
import {
    ConfigProviders,
    FrontendConfig,
    ServerConfig,
} from "./contexts/ConfigProvider";
import { Outlet } from "./features/node";
import core from "./coreCmsPlugin";
import { MainLayot } from "./layouts/MainLayout";

function getModules(config: FrontendConfig) {
    const pluginModules = config.plugins?.flatMap((p) => {
        if ("modules" in p) return p.modules ?? [];
        return [];
    });
    return (config?.modules ?? []).concat(pluginModules ?? []);
}

export const createCms = (config: FrontendConfig) => {
    const _config: FrontendConfig = {
        ...config,
        plugins: [
            ...(config?.plugins ?? []),
            core
        ]
    };

    const modules = getModules(_config);

    createInertiaApp({
        resolve: async (name: string) => {
            let module: any;
            const [moduleType, path] = name.split("::");
            if(path) {
                const moduleConfig = modules.find(m => m.type === moduleType);
                if(!moduleConfig || !moduleConfig?.resolvePage) {
                    throw new Error("Module not found!");
                }
                module = await moduleConfig.resolvePage(path);
            } else {
                const pages = import.meta.glob("./pages/**/*.js");
                module = await pages[`./pages/cms/${name}.js`]();
            }

            if (module.default.layout || module.default.layout === null)
                return module.default;
            
            module.default.layout = MainLayot;
            return module.default;
        },
        setup({ el, App, props }) {
            const root = ReactDOM.createRoot(el);

            root.render(
                <ConfigProviders
                    frontendConfig={_config}
                    outlet={Outlet}
                    serverConfig={
                        props.initialPage.props.config as ServerConfig
                    }
                >
                    <GlobalProviders>
                        <App {...props} />
                    </GlobalProviders>
                </ConfigProviders>
            );
        },
    });
};
