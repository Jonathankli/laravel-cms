import * as React from "react";
import { useCmsDispatch, useCmsSelector } from "../../../../hooks/redux";
import { abortEdit } from "../../cmsObjectSlice";
import { ObjectEditorModal } from "../ObjectEditorModal/ObjectEditorModal";

export function GlobalObjectEditor() {
    const isOpen = useCmsSelector(state => state.cmsObject.isEditorOpen);
    const dispatch = useCmsDispatch();

    return (
        <ObjectEditorModal
            isOpen={isOpen}
            onClose={dispatch.bind(this, abortEdit())}
        />
    );
}
