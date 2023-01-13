import { ActionIcon, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import React from "react";
import { useStyles } from "./useStyles";

interface InsertNodeProps {}

export function InsertNode(props: InsertNodeProps) {
    const { classes } = useStyles();

    return (
        <div className={classes.addButton}>
            <ActionIcon
                color="blue"
                size="md"
                variant="outline"
            >
                <IconPlus size={18} />
            </ActionIcon>
        </div>
    );
}
