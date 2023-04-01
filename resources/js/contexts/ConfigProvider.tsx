import React, { createContext, useState } from "react";

interface ConfigProvidersProps {
    children: any,
    config: Config
}

export interface Config {
    plugins?: PluginConfig[];
    objects?: InputConfig[];
    inputs?: InputConfig[];
    actions?: ActionConfig[];
}

export interface ConfigMap {
    plugins: {[key: string]: PluginConfig};
    objects: {[key: string]: ObjectConfig};
    inputs: {[key: string]: InputConfig};
    actions: {[key: string]: ActionConfig};
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

export const defaultConfig = {
    plugins: {},
    objects: {},
    inputs: {},
    actions: {},
};

export const ConfigContext = createContext<ConfigMap>(defaultConfig);

function map(config: Config): ConfigMap {
    const configMap = defaultConfig;

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
 console.log(configMap);
 
    return configMap;
}

export const ConfigProviders = (props: ConfigProvidersProps) => {

    const [config] = useState(Object.freeze(map(props.config)));

    return (
        <ConfigContext.Provider value={config}>
            {props.children}
        </ConfigContext.Provider>
    );
};
