import { router } from "@inertiajs/react";
import { Button } from "@mantine/core";
import React from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import { useObjectPicker } from "../../../objectPicker";

interface EmptyOutletProps {
    nodeId: string;
    index: number;
}

export function EmptyOutlet(props: EmptyOutletProps) {
    const config = useServerConfig();
    const onObjectSelect = (obj: CmsObject) => {
        router.post(config.paths.admin+"/nodes", {
            ref_node: props.nodeId,
            outlet: props.index,
            insert: "outlet",
            type: obj.type,
            settings: JSON.stringify({})
        })
    };

    const { open } = useObjectPicker(onObjectSelect);

    return (
        <>
            <Button onClick={open}>Einfügen</Button>
        </>
    );
}
