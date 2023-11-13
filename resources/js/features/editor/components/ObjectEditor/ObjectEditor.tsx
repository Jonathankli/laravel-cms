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
    getSettingName,
    serverUpdateEditNode,
    updateObjectOptimistic,
    revertOptimisticUpdate,
} from "../../editorSlice";
import { SettingContainer } from "../SettingContainer/SettingContainer";
import { closeModal, openModal } from "@mantine/modals";
import { debounce } from "../../../../utils/debounce";

export interface ObjectEditorProps {
    isLoadinng?: boolean;
    setIsLoading?(isLoading: boolean): void;
}

export function ObjectEditor(props: ObjectEditorProps) {
    const editNode = useSelector(selectEditNode);
    const editNodeOriginal = useSelector(selectEditNodeOriginal);
    const editNodeMeta = useInertiaProps().editNodeMeta as CmsObject;
    const errors = useInertiaProps().errors?.objectEditor;
    const dispatch = useCmsDispatch();
    const { params, paths } = useServerConfig();


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
                        title: <Text fw="bold">Error</Text>,
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

    const reloadData = (newSettings: Object, setting: string | Setting) => {
        props?.setIsLoading?.(true);
        router.reload({
            headers: {
                "X-CMS-Node-Settings": JSON.stringify(newSettings),
            },
            only: ["editNode", "errors"],
            onSuccess: (page) => {
                dispatch(serverUpdateEditNode({node: page.props.editNode as CmsNode}))
            },
            onError: (page) => {
                dispatch(revertOptimisticUpdate({setting}))
            },
            onFinish: () => {
                props?.setIsLoading?.(false);
            },
        });
    };
    const debouncedReloadData = debounce(reloadData);

    const update = (target: string | Setting, value: any, optimisticValue?: any) => {
        const serverUpdate = editNodeMeta.revalidateServerData || (typeof target !== "string" ? target.serversideValidation : false);
        if(serverUpdate) {
            if(typeof target !== "string" && target.optimistic) {
                dispatch(updateObjectOptimistic({ target, value: optimisticValue ?? value }));
            }
            const newSettings: Object = {...editNode.settings, [getSettingName(target)]: value};
            debouncedReloadData(newSettings, target);
            return;
        }
        
        dispatch(updateObject({ target, value }));
    }

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
                justify="space-between"
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
