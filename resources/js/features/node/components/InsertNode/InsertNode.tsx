import { Inertia } from "@inertiajs/inertia";
import { ActionIcon, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import React, { useState } from "react";
import { ObjectPickerModal, useObjectPicker } from "../../../objectEditor";
import { useStyles } from "./useStyles";

interface InsertNodeProps {
    nodeId: string;
    insert: "before" | "after";
}

export function InsertNode(props: InsertNodeProps) {
    const { classes } = useStyles();
    
    const onObjectSelect = (obj: CmsObject) => {
        Inertia.post("/nodes", {
            ref_node: props.nodeId,
            insert: props.insert,
            type: obj.type,
            settings: JSON.stringify({}),
        });
    };

    const { open } = useObjectPicker(onObjectSelect);

    return (
        <div className={classes.addButton}>
            <ActionIcon
                color="blue"
                size="md"
                variant="outline"
                onClick={open}
            >
                <IconPlus size={18} />
            </ActionIcon>
        </div>
    );
}
