import { ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import React from "react";
import classes from "./styles.module.css";

interface InsertNodeProps {
    openObjectPicker(): void
}

export function InsertNode(props: InsertNodeProps) {
    
    return (
        <div className={classes.addButton}>
            <ActionIcon
                color="blue"
                size="md"
                variant="outline"
                onClick={props.openObjectPicker}
            >
                <IconPlus size={18} />
            </ActionIcon>
        </div>
    );
}
