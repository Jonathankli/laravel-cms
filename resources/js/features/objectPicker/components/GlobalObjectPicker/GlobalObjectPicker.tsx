import { Drawer } from "@mantine/core";
import * as React from "react";
import { useCmsDispatch, useCmsSelector } from "../../../../hooks/redux";
import { abortSelection, selectObject } from "../../objectPickerSlice";
import { ObjectPickerModal } from "../ObjectPickerModal/ObjectPickerModal";

export function GlobalObjectPicker() {
    const isOpen = useCmsSelector(state => state.objectPicker.isSelectorOpen);
    const dispatch = useCmsDispatch();

    return (
        <ObjectPickerModal
            isOpen={isOpen}
            onClose={dispatch.bind(this, abortSelection())}
            onSelect={object => dispatch(selectObject(object))}
        />
    );
}
