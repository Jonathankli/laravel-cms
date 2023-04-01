import useConfig from "./useConfig";

export const useServerConfig = () => {
    return useConfig().serverConfig;
}