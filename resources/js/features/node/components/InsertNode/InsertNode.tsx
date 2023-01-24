import { Inertia } from "@inertiajs/inertia";
import { ActionIcon, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import React, { useState } from "react";
import { ObjectPickerModal, useObjectPicker } from "../../../objectEditor";
import { useStyles } from "./useStyles";

interface InsertNodeProps {
    openObjectPicker(): void
}

export function InsertNode(props: InsertNodeProps) {
    const { classes } = useStyles();
    
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
