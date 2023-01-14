import { Inertia } from "@inertiajs/inertia";
import { ActionIcon, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import React from "react";
import { useStyles } from "./useStyles";

interface InsertNodeProps {
    nodeId: string;
    insert: "before" | "after"
}

export function InsertNode(props: InsertNodeProps) {
    const { classes } = useStyles();

    const onClick = () => {
        Inertia.post("/nodes", {
            ref_node: props.nodeId,
            insert: props.insert,
            type: "section",
            settings: JSON.stringify({})
        })
    }

    return (
        <div className={classes.addButton}>
            <ActionIcon
                color="blue"
                size="md"
                variant="outline"
                onClick={onClick}
            >
                <IconPlus size={18} />
            </ActionIcon>
        </div>
    );
}
