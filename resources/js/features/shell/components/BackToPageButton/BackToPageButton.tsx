import { router } from "@inertiajs/react";
import { Button } from "@mantine/core";
import React from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";

export function BackToPageButton() {
    const path = useInertiaProps().backToPagePath as string | undefined;
    const config = useServerConfig();

    if(!path) {
        return null;
    }

    const toPage = () => {
        router.get(config.paths.cms + path);
    };

    return (
        <Button onClick={toPage}>
            Zurück
        </Button>
    );
}
