import { router } from "@inertiajs/react";
import { Button, Group, Space } from "@mantine/core";
import { useDebouncedState, useDebouncedValue, useDidUpdate } from "@mantine/hooks";
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
import { SettingContainer } from "../SettingContainer/SettingContainer";

export interface ObjectEditorProps {
    isLoadinng?: boolean;
    setIsLoading?(isLoading: boolean): void;
}

export function ObjectEditor(props: ObjectEditorProps) {
    const { objectSettings } = useFrontendConfig();
    const editNode = useSelector(selectEditNode);
    const editNodeOriginal = useSelector(selectEditNodeOriginal);
    const editNodeMeta = useInertiaProps().editNodeMeta as CmsObject;
    const dispatch = useCmsDispatch();
    const { params, paths } = useServerConfig();
    const [debouncedSettings] = useDebouncedValue(
        editNodeMeta?.revalidateServerData 
            ? editNode?.settings 
            : null, 
        500
    );

    useDidUpdate(() => {
        reloadData();
    }, [debouncedSettings]);

    if (!editNodeMeta || !editNode || !editNodeOriginal) {
        return <>Error!</>;
    }

    const saveObject = () => {
        router.patch(paths.admin+"/nodes/"+editNodeOriginal.id, {
            settings: editNode.settings as any, //idk why typscrout is complaining
        }, {
            onSuccess: () => {
                setTimeout(() => {
                    dispatch(saveObjectAction());
                }, 10);
            }
        });
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
    const reloadData = () => {
        props?.setIsLoading?.(true);
        router.reload({
            headers: {
                "X-CMS-Node-Settings": JSON.stringify(debouncedSettings)
            },
            only: ["nodes"],
            onFinish: () => {
                props?.setIsLoading?.(false);
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
                {editNodeMeta.settings.map((setting) => (
                    <SettingContainer
                        key={setting.name}
                        update={update}
                        reset={reset}
                        resetDefault={resetDefault}
                        setting={setting}
                    />
                ))}
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
