import { router } from "@inertiajs/react";
import * as React from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import { useCmsDispatch, useCmsSelector } from "../../../../hooks/redux";
import { abortEdit } from "../../cmsObjectSlice";
import { useObjectEditor } from "../../hooks/useObjectEditor";
import { ObjectEditorModal } from "../ObjectEditorModal/ObjectEditorModal";

export function GlobalObjectEditor() {
    const isOpen = useCmsSelector(state => state.cmsObject.isEditorOpen);
    const dispatch = useCmsDispatch();
    const { params } = useServerConfig();

    const close = () => {
        router.reload({
            data: {
                [params.base + "_enode"]: undefined
            },
            onSuccess: () => {
                dispatch(abortEdit());
            }
        })
    }

    return (
        <ObjectEditorModal
            isOpen={isOpen}
            onClose={close}
        />
    );
}
