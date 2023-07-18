import { Drawer, Group, Loader } from "@mantine/core";
import * as React from "react";
import { ObjectEditor, ObjectEditorProps } from "../ObjectEditor/ObjectEditor";

interface ObjectEditorModalProps extends ObjectEditorProps {
    isOpen: boolean;
    onClose(): void;
}

export function ObjectEditorModal(props: ObjectEditorModalProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    return (
        <Drawer
            title={
               <Group>
                     <p>Object Editor</p>
                     {isLoading && <Loader size={"xs"} />}
               </Group>
            }
            padding="md"
            size="md"
            position="right"
            closeOnClickOutside={false}
            withOverlay={false}
            opened={props.isOpen}
            onClose={props.onClose}
        >
            <ObjectEditor {...props} isLoadinng={isLoading} setIsLoading={setIsLoading} />
        </Drawer>
    );
}
