import { router } from "@inertiajs/react";
import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconUnlink } from "@tabler/icons";
import React from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import classes from "./styles.module.css";

interface ShellActionsProps {
}

export function ShellActions(props: ShellActionsProps) {
    const config = useServerConfig();
    const page = useInertiaProps().page as Page;

    const unlinkShell = () => {
        router.delete(config.paths.admin+"/pages/"+page.id+"/shell");
    };
    const editShell = () => {
        router.get(config.paths.admin+"/pages/"+page.id+"/shell/edit");
    };
    
    return (
        <div className={classes.actions}>
            <Group>
                <ActionIcon
                    color="blue"
                    size="md"
                    variant="filled"
                    onClick={editShell}
                >
                    <IconEdit size={18} />
                </ActionIcon>
                <ActionIcon
                    color="red"
                    size="md"
                    variant="filled"
                    onClick={unlinkShell}
                >
                    <IconUnlink size={18} />
                </ActionIcon>
     
            </Group>
        </div>
    );
}
