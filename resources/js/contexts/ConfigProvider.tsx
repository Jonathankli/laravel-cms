import React, { createContext, useState } from "react";

interface ConfigProvidersProps {
    children: any,
    frontendConfig: FrontendConfig
    serverConfig: ServerConfig;
}

export interface ServerConfig {
    paths: {
        cms: string;
        live: string;
        admin: string;
        api: string;
    },
    params: {
        base: string;
    }
}

export interface FrontendConfig {
    plugins?: PluginConfig[];
    objects?: ObjectConfig[];
    objectSettings?: ObjectSettingConfig[];
    actions?: ActionConfig[];
}

export interface FrontendConfigMap {
    plugins: {[key: string]: PluginConfig};
    objects: {[key: string]: ObjectConfig};
    objectSettings: {[key: string]: ObjectSettingConfig};
    actions: {[key: string]: ActionConfig};
}
export interface Config {
    frontendConfig: FrontendConfigMap;
    serverConfig: ServerConfig;
}

export interface PluginConfig {
    name: string;
    objects?: ObjectConfig[];
    actions?: ActionConfig[];
    objectSettings?: ObjectSettingConfig[];
}
type ReactComponent = (props: any) => JSX.Element;
export interface ComponentWithFallback {
    Fallback: ReactComponent;
    Component: ReactComponent
}
export interface ObjectConfig {
    name: string;
    Component: ComponentWithFallback | ReactComponent
}
export interface ObjectSettingConfig {
    name: string;
    Component: ComponentWithFallback | ReactComponent
}
export interface ActionConfig {
    name: string;
    Component: ComponentWithFallback | ReactComponent
}

export const defaultConfig: Config  = {
    frontendConfig: {
        plugins: {},
        objects: {},
        objectSettings: {},
        actions: {},
    },
    serverConfig: {
        paths: {
            cms: "/cms",
            live: "/",
            admin: "/cms/admin",
            api: "/cms/admin/api",
        },
        params: {
            base: "_cms",
        }
    }
};

export const ConfigContext = createContext<Config>(defaultConfig);

function map(config: FrontendConfig): FrontendConfigMap {
    const configMap = defaultConfig.frontendConfig;

    const objects = (config?.objects || []).concat((config?.plugins || []).flatMap(p => (p?.objects || [])));
    configMap.objects = objects.reduce((acc, item) => ({...acc, [item.name]: item}), {});
    
    const actions = (config?.actions || []).concat((config?.plugins || []).flatMap(p => (p?.actions || [])));
    configMap.actions = actions.reduce((acc, item) => ({...acc, [item.name]: item}), {});
    
    const objectSettings = (config?.objectSettings || []).concat((config?.plugins || []).flatMap(p => (p?.objectSettings || [])));
    configMap.objectSettings = objectSettings.reduce((acc, item) => ({...acc, [item.name]: item}), {});
    
    const plugins = (config?.plugins || []);
    configMap.plugins = plugins.reduce((acc, item) => ({...acc, [item.name]: item}), {});
 
    return configMap;
}

export const ConfigProviders = (props: ConfigProvidersProps) => {

    const [config] = useState(Object.freeze({
        frontendConfig: map(props.frontendConfig),
        serverConfig: props.serverConfig,
    }));

    return (
        <ConfigContext.Provider value={config}>
            {props.children}
        </ConfigContext.Provider>
    );
};
