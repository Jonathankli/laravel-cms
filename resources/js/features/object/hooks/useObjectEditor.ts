import { router } from "@inertiajs/react";
import { useServerConfig } from "../../../hooks/config/useServerConfig";
import { useCmsDispatch } from "../../../hooks/redux";
import { abortEdit, openEditor } from "../cmsObjectSlice";

export function useObjectEditor(node?: CmsNode) {

    const { params } = useServerConfig();

    const dispatch = useCmsDispatch();
    const open = (_node?: CmsNode) => {
        let tempNode = _node;
        if(!tempNode) tempNode = node;
        if(!tempNode) throw new Error("No node provided!");
        router.reload({
            data: {
                [params.base + "_enode"]: tempNode.id 
            },
            onSuccess: () => {
                if(!tempNode) throw new Error("No node provided!");
                dispatch(openEditor({node: tempNode}))
            }
        })
    };
    const abort = () => {
        router.reload({
            data: {
                [params.base + "_enode"]: undefined
            },
            onSuccess: () => {
                dispatch(abortEdit())
            }
        })
    }

    return {
        open,
        abort,
    }
}