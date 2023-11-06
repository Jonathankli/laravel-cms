import { router } from "@inertiajs/react";
import { Button, Group, Text } from "@mantine/core";
import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";
import * as React from "react";
import { useSelector } from "react-redux";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useCmsDispatch } from "../../../../hooks/redux";
import {
    abortEdit,
    selectEditNode,
    selectEditNodeOriginal,
    updateObject,
    saveObject as saveObjectAction,
    selectRevalidateServerdata,
    getSettingName,
} from "../../editorSlice";
import { SettingContainer } from "../SettingContainer/SettingContainer";
import { closeModal, openModal } from "@mantine/modals";

export interface ObjectEditorProps {
    isLoadinng?: boolean;
    setIsLoading?(isLoading: boolean): void;
}

export function ObjectEditor(props: ObjectEditorProps) {
    const editNode = useSelector(selectEditNode);
    const editNodeOriginal = useSelector(selectEditNodeOriginal);
    const revalidateServerData = useSelector(selectRevalidateServerdata);
    const editNodeMeta = useInertiaProps().editNodeMeta as CmsObject;
    const errors = useInertiaProps().errors?.objectEditor;
    const dispatch = useCmsDispatch();
    const { params, paths } = useServerConfig();
    const [debouncedSettings] = useDebouncedValue(
        editNode?.settings,
        500
    );

    useDidUpdate(() => {
        if(editNodeMeta?.revalidateServerData || revalidateServerData) {
            reloadData();
        }
    }, [debouncedSettings]);

    if (!editNodeMeta || !editNode || !editNodeOriginal) {
        return <>Error!</>;
    }

    const saveObject = () => {
        router.patch(
            paths.admin + "/nodes/" + editNodeOriginal.id,
            {
                settings: editNode.settings as any, //idk why typscrout is complaining
            },
            {
                onError: (errors) => {
                    openModal({
                        title: <Text weight="bold">Error</Text>,
                        modalId: "object-editor-error",
                        zIndex: 10000,
                        children: (
                            <>
                                <Text>Deine einsztellungen sind nicht Valide, bitte überprüfe diese, bevor du das Objekt speicherst.</Text>
                                <Button mt="md" fullWidth variant="outline" onClick={() => closeModal("object-editor-error")}>Schließen</Button>
                            </>
                        ),
                    });
                },
                onSuccess: () => {
                    setTimeout(() => {
                        dispatch(saveObjectAction());
                    }, 10);
                },
            }
        );
    };
    const close = () => {
        router.reload({
            data: {
                [params.base + "_enode"]: undefined,
            },
            onSuccess: () => {
                dispatch(abortEdit());
            },
        });
    };
    const reloadData = () => {
        props?.setIsLoading?.(true);
        router.reload({
            headers: {
                "X-CMS-Node-Settings": JSON.stringify(debouncedSettings),
            },
            only: ["editNode", "errors"],
            onFinish: () => {
                props?.setIsLoading?.(false);
            },
        });
    };

    const update = (target: string | Setting, value: any) =>
        dispatch(updateObject({ target, value }));

    const reset = (target: string | Setting) =>
        dispatch(
            updateObject({
                target,
                value:
                    editNodeOriginal?.settings?.[getSettingName(target)] ??
                    editNodeMeta.settings.find(
                        (setting) => setting.name === target
                    )?.default,
            })
        );
    const resetDefault = (target: string | Setting) =>
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
                        error={errors?.[setting.name]}
                    />
                ))}
            </div>
            <Group
                position="apart"
                p={"sm"}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "white",
                }}
            >
                <Button onClick={saveObject}>Save</Button>
                <Button variant="default" onClick={close}>
                    Cancel
                </Button>
            </Group>
        </>
    );
}
