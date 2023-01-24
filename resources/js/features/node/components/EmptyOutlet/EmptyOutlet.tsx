import { router } from "@inertiajs/react";
import { Button } from "@mantine/core";
import React, { useState } from "react";
import { ObjectPickerModal, useObjectPicker } from "../../../objectEditor";

interface EmptyOutletProps {
    nodeId: string;
    index: number;
}

export function EmptyOutlet(props: EmptyOutletProps) {

    const onObjectSelect = (obj: CmsObject) => {
        router.post("/nodes", {
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
