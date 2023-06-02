import { Drawer } from "@mantine/core";
import * as React from "react";
import { ObjectEditor, ObjectEditorProps } from "../ObjectEditor/ObjectEditor";

interface ObjectEditorModalProps extends ObjectEditorProps {
    isOpen: boolean;
    onClose(): void;
}

export function ObjectEditorModal(props: ObjectEditorModalProps) {
    return (
        <Drawer
            title={"Edit Object"}
            padding="md"
            size="md"
            position="right"
            closeOnClickOutside={false}
            withOverlay={false}
            overlayOpacity={0}
            opened={props.isOpen}
            onClose={props.onClose}
        >
            <ObjectEditor {...props} />
        </Drawer>
    );
}
