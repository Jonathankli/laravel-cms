import { Drawer } from "@mantine/core";
import * as React from "react";
import { ObjectPicker, ObjectPickerProps } from "../ObjectPicker/ObjectPicker";

interface ObjectPickerModalProps extends ObjectPickerProps {
    isOpen: boolean;
    onClose(): void;
}

export function ObjectPickerModal(props: ObjectPickerModalProps) {
    return (
        <Drawer
            title={"CMS-Objects"}
            padding="md"
            size="md"
            closeOnClickOutside={false}
            withOverlay={false}
            overlayOpacity={0}
            opened={props.isOpen}
            onClose={props.onClose}
        >
            <ObjectPicker {...props} />
        </Drawer>
    );
}
