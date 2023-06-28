import { router } from "@inertiajs/react";
import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons";
import React from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import { useObjectEditor } from "../../../object";
import { useStyles } from "./useStyles";

interface InsertNodeProps {
    node: CmsNode;
}

export function NodeActions(props: InsertNodeProps) {
    const { classes } = useStyles();
    const { open } = useObjectEditor(props.node);
    const config = useServerConfig();

    const destroyNode = () => {
        router.delete(config.paths.admin+"/nodes/"+props.node.id);
    };
    
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
                <ActionIcon
                    color="red"
                    size="md"
                    variant="outline"
                    onClick={destroyNode}
                >
                    <IconTrash size={18} />
                </ActionIcon>
            </Group>
        </div>
    );
}
