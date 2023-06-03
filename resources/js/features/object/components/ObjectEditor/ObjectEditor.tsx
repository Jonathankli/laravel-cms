import { router } from "@inertiajs/react";
import { Button, Flex, Group, Text, Title } from "@mantine/core";
import * as React from "react";
import { useSelector } from "react-redux";
import useFrontendConfig from "../../../../hooks/config/useFrontendConfig";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useCmsDispatch } from "../../../../hooks/redux";
import {
    abortEdit,
    saveObject as saveObjectAction,
    selectEditNode,
    selectEditNodeOriginal,
    updateObject,
} from "../../cmsObjectSlice";

export interface ObjectEditorProps {}

export function ObjectEditor(props: ObjectEditorProps) {
    const { objectSettings } = useFrontendConfig();
    const editNode = useSelector(selectEditNode);
    const editNodeOriginal = useSelector(selectEditNodeOriginal);
    const editNodeMeta = useInertiaProps().editNodeMeta as CmsObject;
    const dispatch = useCmsDispatch();
    const { params } = useServerConfig();

    if (!editNodeMeta || !editNode) {
        return <>Error!</>;
    }

    const saveObject = () => {
        //TODO
        dispatch(saveObjectAction());
    }
    const close = () => {
        router.reload({
            data: {
                [params.base + "_enode"]: undefined
            },
            onSuccess: () => {
                dispatch(abortEdit());
            }
        });
    }

    const update = (target: string, value: any) =>
        dispatch(updateObject({ target, value }));
    const reset = (target: string) =>
        dispatch(
            updateObject({
                target,
                value:
                    editNodeOriginal?.settings?.[target] ??
                    editNodeMeta.settings.find(
                        (setting) => setting.name === target
                    )?.default,
            })
        );
    const resetDefault = (target: string) =>
        dispatch(
            updateObject({
                target,
                value: editNodeMeta.settings.find(
                    (setting) => setting.name === target
                )?.default,
            })
        );

    return (
        <>
            <div>
                {editNodeMeta.settings.map((setting) => {
                    const settingConfig = objectSettings[setting.component];
                    if (!settingConfig) {
                        console.error(
                            `Setting component ${setting.component} not found!`
                        );
                        return;
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
                            <Text>{setting.name}</Text>
                            <Component
                                {...setting}
                                key={setting.name}
                                value={value}
                                update={update.bind(this, setting.name)}
                                reset={reset.bind(this, setting.name)}
                                resetDefault={resetDefault.bind(this, setting.name)}
                            />
                        </>
                    );
                })}
            </div>
            <Group position="apart" p={"sm"} style={{position: "absolute", bottom: 0, left: 0, right: 0, background: "white"}}>
                <Button onClick={saveObject}>Save</Button>
                <Button variant="default" onClick={close}>
                    Cancel
                </Button>
            </Group>
        </>
    );
}
