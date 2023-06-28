import { router } from "@inertiajs/react";
import { Button } from "@mantine/core";
import React from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useShell } from "../../live";

export function PublishButton() {
    const shell = useInertiaProps().shell as Shell;
    const config = useServerConfig();
    const [loading, setLoading] = React.useState(false);

    if(!shell) {
        return null;
    }

    const publishShell = () => {
        router.post(config.paths.admin+"/shells/"+shell.id+"/publish", { }, {
            onBefore: () => {
                setLoading(true);
            },
            onFinish: () => {
                setLoading(false);
            }
         });
    };

    return (
        <Button onClick={publishShell} loading={loading}>
            Publish
        </Button>
    );
}
