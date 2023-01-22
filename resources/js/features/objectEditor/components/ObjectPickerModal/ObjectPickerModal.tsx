import { Drawer } from "@mantine/core";
import * as React from "react";
import { ObjectPicker, ObjectPickerProps } from "../ObjectPicker/ObjectPicker";

interface ObjectPickerModalProps extends ObjectPickerProps {
    isOpen: boolean
    onClose(): void
}

export function ObjectPickerModal(props: ObjectPickerModalProps) {

    return (
        <Drawer opened={props.isOpen} onClose={props.onClose}>
            <ObjectPicker {...props} />
        </Drawer>
    );
}
