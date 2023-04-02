import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons";
import React from "react";
import { useStyles } from "./useStyles";

interface InsertNodeProps {
    // openObjectPicker(): voi
}

export function NodeActions(props: InsertNodeProps) {
    const { classes } = useStyles();
    
    return (
        <div className={classes.actions}>
            <Group>
                <ActionIcon
                    color="blue"
                    size="md"
                    variant="outline"
                >
                    <IconEdit size={18} />
                </ActionIcon>
            </Group>
        </div>
    );
}
