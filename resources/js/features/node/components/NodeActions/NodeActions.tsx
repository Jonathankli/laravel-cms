import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons";
import React from "react";
import { useObjectEditor } from "../../../object";
import { useStyles } from "./useStyles";

interface InsertNodeProps {
    node: CmsNode;
}

export function NodeActions(props: InsertNodeProps) {
    const { classes } = useStyles();
    const { open } = useObjectEditor(props.node);
    
    return (
        <div className={classes.actions}>
            <Group>
                <ActionIcon
                    color="blue"
                    size="md"
                    variant="outline"
                    onClick={() => open()}
                >
                    <IconEdit size={18} />
                </ActionIcon>
            </Group>
        </div>
    );
}
