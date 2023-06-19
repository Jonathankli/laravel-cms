import { router } from "@inertiajs/react";
import { Button } from "@mantine/core";
import React from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";

export function PublishButton() {
    const page = useInertiaProps().page as Page;
    const config = useServerConfig();
    const [loading, setLoading] = React.useState(false);

    const publishPage = () => {
        router.post(config.paths.admin+"/pages/"+page.id+"/publish", { }, {
            onBefore: () => {
                setLoading(true);
            },
            onFinish: () => {
                setLoading(false);
            }
         });
    };

    return (
        <Button onClick={publishPage} loading={loading}>
            Publish
        </Button>
    );
}
