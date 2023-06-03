import { router } from "@inertiajs/react";
import * as React from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useCmsDispatch, useCmsSelector } from "../../../../hooks/redux";
import { abortEdit, openEditor } from "../../cmsObjectSlice";
import { useObjectEditor } from "../../hooks/useObjectEditor";
import { ObjectEditorModal } from "../ObjectEditorModal/ObjectEditorModal";

export function GlobalObjectEditor() {
    const isOpen = useCmsSelector(state => state.cmsObject.isEditorOpen);
    const dispatch = useCmsDispatch();
    const { params } = useServerConfig();
    const editNodeMeta = useInertiaProps().editNodeMeta as CmsObject | undefined;
    const nodes = useInertiaProps().nodes as CmsNode[];

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

    React.useEffect(() => {
        if (editNodeMeta) {
            const node = nodes.find(node => node.id === editNodeMeta?.id);
            if(node)
                dispatch(openEditor({node}));
        }
    }, []);

    return (
        <ObjectEditorModal
            isOpen={isOpen}
            onClose={close}
        />
    );
}
