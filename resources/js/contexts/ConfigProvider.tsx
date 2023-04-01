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
    }
}

export interface FrontendConfig {
    plugins?: PluginConfig[];
    objects?: InputConfig[];
    inputs?: InputConfig[];
    actions?: ActionConfig[];
}

export interface FrontendConfigMap {
    plugins: {[key: string]: PluginConfig};
    objects: {[key: string]: ObjectConfig};
    inputs: {[key: string]: InputConfig};
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
    inputs?: InputConfig[];
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
export interface InputConfig {
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
        inputs: {},
        actions: {},
    },
    serverConfig: {
        paths: {
            cms: "/cms",
            live: "/",
            admin: "/cms/admin",
            api: "/cms/admin/api",
        }
    }
};

export const ConfigContext = createContext<Config>(defaultConfig);

function map(config: FrontendConfig): FrontendConfigMap {
    const configMap = defaultConfig.frontendConfig;

    const objects = (config?.objects || []).concat((config?.plugins || []).flatMap(p => (p?.objects || [])));
    console.log((config?.objects || []), (config?.plugins || []).flatMap(p => (p?.objects || [])) );
    console.log((config));
    
    configMap.objects = objects.reduce((acc, item) => ({...acc, [item.name]: item}), {});
    
    const actions = (config?.actions || []).concat((config?.plugins || []).flatMap(p => (p?.actions || [])));
    configMap.actions = actions.reduce((acc, item) => ({...acc, [item.name]: item}), {});
    
    const inputs = (config?.inputs || []).concat((config?.plugins || []).flatMap(p => (p?.inputs || [])));
    configMap.inputs = inputs.reduce((acc, item) => ({...acc, [item.name]: item}), {});
    
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
