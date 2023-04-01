import { router } from "@inertiajs/react";
import { Button } from "@mantine/core";
import React, { useState } from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import { ObjectPickerModal, useObjectPicker } from "../../../objectEditor";

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
