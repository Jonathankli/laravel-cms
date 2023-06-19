import React from "react";
import ReactDOM from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import {
    ConfigProviders,
    FrontendConfigLive,
    ServerConfig,
} from "./contexts/ConfigProvider";
import { Outlet } from "./features/live/live";

export const createLive = (config: FrontendConfigLive) => {
    createInertiaApp({
        resolve: async (name: string) => {
            const pages = import.meta.glob("./pages/**/*.js");
            return await pages[`./pages/live/${name}.js`]();
        },
        setup({ el, App, props }) {
            const root = ReactDOM.createRoot(el);
            root.render(
                <ConfigProviders
                    outlet={Outlet}
                    frontendConfig={config}
                    serverConfig={
                        props.initialPage.props.config as ServerConfig
                    }
                >
                    <App {...props} />
                </ConfigProviders>
            );
        },
    });
};
