import { router } from "@inertiajs/react";
import { Button } from "@mantine/core";
import React from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useShell } from "../../live";

export function ToShellButton() {
    const shell = useInertiaProps().shell as Shell;
    const config = useServerConfig();

    if(!shell) {
        return null;
    }

    const toShell = () => {
        router.get(config.paths.admin+"/shells/"+shell.id+"/edit");
    };

    return (
        <Button onClick={toShell}>
            Edit Shell
        </Button>
    );
}
