import React, { createContext, useState } from "react";

interface ConfigProvidersProps {
    children: any,
    frontendConfig: FrontendConfig | FrontendConfigLive,
    serverConfig: ServerConfig;
    outlet: ReactComponent;
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

export interface FrontendConfigLive {
    plugins?: PluginConfigLive[];
    objects?: ObjectConfig[];
}

export interface FrontendConfig {
    extend?: FrontendConfigLive;
    plugins?: PluginConfig[];
    objects?: ObjectConfig[];
    modules?: ModuleConfig[];
    objectSettings?: ObjectSettingConfig[];
    actions?: ActionConfig[];
}

export interface FrontendConfigMap {
    plugins: {[key: string]: FullPluginConfig};
    modules: {[key: string]: ModuleConfig};
    objects: {[key: string]: ObjectConfig};
    objectSettings: {[key: string]: ObjectSettingConfig};
    actions: {[key: string]: ActionConfig};
}
export interface Config {
    components: CmsComponents;
    frontendConfig: FrontendConfigMap;
    serverConfig: ServerConfig;
}

export interface CmsComponents {
    outlet: ReactComponent;
}

export interface PluginConfigLive {
    name: string;
    objects?: ObjectConfig[];
}
export interface ExtendedPluginConfig {
    extend: PluginConfigLive;
    actions?: ActionConfig[];
    modules?: ModuleConfig[];
    objectSettings?: ObjectSettingConfig[];
}
export interface CmsPluginConfig {
    name: string;
    actions?: ActionConfig[];
    modules?: ModuleConfig[];
    objectSettings?: ObjectSettingConfig[];
}

export type PluginConfig = ExtendedPluginConfig | CmsPluginConfig | PluginConfigLive;
export type FullPluginConfig = Omit<ExtendedPluginConfig & CmsPluginConfig & PluginConfigLive, 'extend'>;

type ReactComponent = (props: any) => JSX.Element;
export interface ComponentWithFallback {
    Fallback: ReactComponent;
    Component: ReactComponent
}
export interface ObjectConfig {
    name: string;
    Component: ComponentWithFallback | ReactComponent
}
export interface ModuleConfig {
    type: string;
    icon?: ReactComponent;
    resolvePage(name: string): ReactComponent;
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
    components: {
        outlet: () => (<></>),
    },
    frontendConfig: {
        plugins: {},
        objects: {},
        modules: {},
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

    const plugins: {[key: string]: FullPluginConfig} = (config?.plugins || []).reduce((acc, item) => {
        const fullPlugin: FullPluginConfig = {
            name: "name" in item ? item.name : "",
        }; 
        if ("actions" in item) {
            fullPlugin.actions = item.actions;
        }
        if("objectSettings" in item) {
            fullPlugin.objectSettings = item.objectSettings;
        }
        if("objects" in item) {
            fullPlugin.objects = item.objects;
        }
        if("modules" in item) {
            fullPlugin.modules = item.modules;
        }
        if("extend" in item) {
            fullPlugin.name = item.extend.name;
            if(fullPlugin.objects?.length) fullPlugin.objects?.concat(item.extend.objects || []);
            else fullPlugin.objects = item.extend.objects;
        }
        return ({...acc, [fullPlugin.name]: fullPlugin});
    }, {});
    configMap.plugins = plugins;

    const objects = (config?.objects || []).concat(Object.values(plugins).flatMap(p => (p?.objects || [])));
    configMap.objects = objects.reduce((acc, item) => ({...acc, [item.name]: item}), {});
    
    const actions = (config?.actions || []).concat(Object.values(plugins).flatMap(p => (p?.actions || [])));
    configMap.actions = actions.reduce((acc, item) => ({...acc, [item.name]: item}), {});

    const modules = (config?.modules || []).concat(Object.values(plugins).flatMap(p => (p?.modules || [])));
    configMap.modules = modules.reduce((acc, item) => ({...acc, [item.type]: item}), {});
    
    const objectSettings = (config?.objectSettings || []).concat(Object.values(plugins).flatMap(p => (p?.objectSettings || [])));
    configMap.objectSettings = objectSettings.reduce((acc, item) => ({...acc, [item.name]: item}), {});

    return configMap;
}

function merge(config: FrontendConfig): FrontendConfig {
    if(!config?.extend) return config;
    config.objects = (config.objects || []);
    config.objects.unshift(...config.extend.objects || []);
    config.plugins = (config.plugins || []);
    config.plugins.unshift(...config.extend.plugins || []);
    return config;
}

export const ConfigProviders = (props: ConfigProvidersProps) => {

    const [config] = useState(Object.freeze({
        components: {
            outlet: props.outlet,
        },
        frontendConfig: map(merge(props.frontendConfig)),
        serverConfig: props.serverConfig,
    }));

    return (
        <ConfigContext.Provider value={config}>
            {props.children}
        </ConfigContext.Provider>
    );
};
