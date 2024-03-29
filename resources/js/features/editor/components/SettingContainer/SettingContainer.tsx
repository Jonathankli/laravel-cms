import { router } from "@inertiajs/react";
import { Space, Text } from "@mantine/core";
import { useDebouncedState, useDidUpdate } from "@mantine/hooks";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFrontendConfig from "../../../../hooks/config/useFrontendConfig";
import { addSettingServerData, selectEditNode, selectSettingsData } from "../../editorSlice";
import { useCmsDispatch } from "../../../../hooks/redux";

export interface SettingContainerProps {
    setting: Setting;
    error: string;
    update(target: string | Setting, value: any): void;
    reset(target: string | Setting): void;
    resetDefault(target: string | Setting): void;
}

export function SettingContainer(props: SettingContainerProps) {

    const { setting } = props;
    const { objectSettings } = useFrontendConfig();
    const dispatch = useCmsDispatch();
    const editNode = useSelector(selectEditNode);
    const serverData = useSelector(selectSettingsData(setting.name));
    const [debouncedPayload, setDebouncedPayload] = useDebouncedState(null, 500);
    const [isLoading, setIsLoading] = React.useState(false);

    const reload = (payload: any = null) => {
        router.reload({
            only: ["settingServerData"],
            headers: {
                "X-CMS-Setting-Data-Request": JSON.stringify({
                    setting: setting.name,
                    payload,
                }),
            },
            onSuccess: (page) => {
                const data = page.props.settingServerData as {name?: string, data?: any}
                if(data?.name === setting.name) {
                    dispatch(addSettingServerData({name: setting.name, data: data.data}));
                }
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    }

    const requestServerData = (payload: any, debounce: boolean = false) => {
        setIsLoading(true);
        if(debounce) {
            setDebouncedPayload(payload);
            return;
        }
        reload(payload);
    }

    useDidUpdate(() => {
        reload(debouncedPayload);
    }, [debouncedPayload]);

    if (!editNode) {
        return <>Error!</>;
    }
    
    const settingConfig = objectSettings[setting.component];
    if (!settingConfig) {
        console.error(
            `Setting component ${setting.component} not found!`
        );
        return <>Error!</>;
    }
    
    const value = editNode.settings?.[setting.name];

    let Component = settingConfig.Component;
    let Fallback: any = null;
    if (typeof Component === "object") {
        Fallback = Component.Fallback;
        Component = Component.Component;
    }
    
    return (
        <>
            <Component
                {...setting}
                error={props.error}
                data={serverData ?? setting.data}
                key={setting.name}
                value={value}
                update={props.update.bind(this, setting)}
                reset={props.reset.bind(this, setting)}
                resetDefault={props.resetDefault.bind(this, setting)}
                requestServerData={requestServerData}
                isLoading={isLoading}
            />
            <Text style={{color: "red"}} size="xs">{props.error}</Text>
            <Space h="sm" />
        </>
    );
}
