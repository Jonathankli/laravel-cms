import React from "react";
import ReactDOM from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import GlobalProviders from "./contexts/GlobalProvider";
import CmsLayout from "./layouts/CmsLayout";
import {
    ConfigProviders,
    FrontendConfig,
    ServerConfig,
} from "./contexts/ConfigProvider";
import { Outlet } from "./features/node";
import core from "./core";

export const createCms = (config: FrontendConfig) => {
    createInertiaApp({
        resolve: async (name: string) => {
            const pages = import.meta.glob("./pages/**/*.js");
            const module: any = await pages[`./pages/cms/${name}.js`]();

            // if (module.default.layout || module.default.layout === null)
            //     return module.default;
            
            return module.default;
        },
        setup({ el, App, props }) {
            const root = ReactDOM.createRoot(el);
            
            const _config: FrontendConfig = {
                ...config,
                plugins: [
                    ...(config?.plugins ?? []),
                    core
                ]
            };

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
