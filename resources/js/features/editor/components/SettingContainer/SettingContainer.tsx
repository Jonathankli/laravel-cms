import { router } from "@inertiajs/react";
import { Space } from "@mantine/core";
import { useDebouncedState, useDidUpdate } from "@mantine/hooks";
import * as React from "react";
import { useSelector } from "react-redux";
import useFrontendConfig from "../../../../hooks/config/useFrontendConfig";
import { selectEditNode } from "../../editorSlice";

export interface SettingContainerProps {
    setting: Setting
    update(target: string, value: any): void;
    reset(target: string): void;
    resetDefault(target: string): void;
}

export function SettingContainer(props: SettingContainerProps) {

    const { setting } = props;
    const { objectSettings } = useFrontendConfig();
    const editNode = useSelector(selectEditNode);
    const [debouncedPayload, setDebouncedPayload] = useDebouncedState(null, 500);
    const [isLoading, setIsLoading] = React.useState(false);

    const reload = (payload: any = null) => {
        router.reload({
            headers: {
                "X-Setting-Reload": JSON.stringify({
                    setting: setting.name,
                    payload,
                }),
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
