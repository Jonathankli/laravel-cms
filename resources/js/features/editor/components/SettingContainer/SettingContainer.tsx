import { router } from "@inertiajs/react";
import { Space } from "@mantine/core";
import { useDebouncedState, useDidUpdate } from "@mantine/hooks";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFrontendConfig from "../../../../hooks/config/useFrontendConfig";
import { addSettingServerData, selectEditNode, selectSettingsData } from "../../editorSlice";
import { useCmsDispatch } from "../../../../hooks/redux";

export interface SettingContainerProps {
    setting: Setting
    update(target: string, value: any): void;
    reset(target: string): void;
    resetDefault(target: string): void;
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
                data={serverData ?? setting.data}
                key={setting.name}
                value={value}
                update={props.update.bind(this, setting.name)}
                reset={props.reset.bind(this, setting.name)}
                resetDefault={props.resetDefault.bind(this, setting.name)}
                requestServerData={requestServerData}
                isLoading={isLoading}
            />
            <Space h="sm" />
        </>
    );
}
