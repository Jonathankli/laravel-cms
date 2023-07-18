import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { useCmsDispatch, useCmsStore } from "../../../hooks/redux";
import { abortSelection, openSelector } from "../editorSlice";

export function useObjectPicker(onSelect: (object: StaticCmsObject) => void) {

    const dispatch = useCmsDispatch();
    const store = useCmsStore();
    const [uuid] = useState(v4);


    useEffect(() => {
        if(store.getState().editor.prevSelectedObject) {
            return;
        }
        const unsubscribe = store.subscribe(() => {
            const obj = store.getState().editor.prevSelectedObject;
            const activeUUid = store.getState().editor.activeObjectPickerUuid;
            if(obj && activeUUid === uuid) {
                onSelect(obj);
                unsubscribe();
            }
        })
        return () => unsubscribe();
    }, [store, onSelect])

    const open = () => dispatch(openSelector({objectPickerId: uuid}));
    const abort = () => dispatch(abortSelection());

    return {
        open,
        abort,
    }
}