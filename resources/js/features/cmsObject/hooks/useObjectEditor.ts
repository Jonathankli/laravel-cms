import { useCmsDispatch } from "../../../hooks/redux";
import { abortSelection, openEditor } from "../cmsObjectSlice";

export function useObjectEditor(node?: CmsNode) {

    const dispatch = useCmsDispatch();
    const open = (_node?: CmsNode) => {
        let tempNode = _node;
        if(!tempNode) tempNode = node;
        if(!tempNode) throw new Error("No node provided!");
        dispatch(openEditor({node: tempNode}))
    };
    const abort = () => dispatch(abortSelection());

    return {
        open,
        abort,
    }
}