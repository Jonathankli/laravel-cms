import { useEffect } from "react";
import { useStore } from "react-redux"
import { useCmsDispatch, useCmsStore } from "../../../hooks/redux";
import { abortSelection, openSelector } from "../objectEditorSlice";

export function useObjectPicker(onSelect: (object: CmsObject) => void) {

    const dispatch = useCmsDispatch();
    const store = useCmsStore();

    useEffect(() => {
        if(store.getState().objectEditor.prevSelectedObject) {
            return;
        }
        const unsubscribe = store.subscribe(() => {
            const obj = store.getState().objectEditor.prevSelectedObject;
            if(obj) {
                onSelect(obj);
                unsubscribe();
            }
        })
        return () => unsubscribe();
    }, [store, onSelect])

    const open = () => dispatch(openSelector());
    const abort = () => dispatch(abortSelection());

    return {
        open,
        abort,
    }
}