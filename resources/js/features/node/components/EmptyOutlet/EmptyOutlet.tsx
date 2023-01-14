import { Inertia } from "@inertiajs/inertia";
import { Button } from "@mantine/core";
import React from "react";

interface EmptyOutletProps {
    nodeId: string;
    index: number;
}

export function EmptyOutlet(props: EmptyOutletProps) {

    const onClick = () => {
        Inertia.post("/nodes", {
            ref_node: props.nodeId,
            outlet: props.index,
            insert: "outlet",
            type: "section",
            settings: JSON.stringify({})
        })
    }

    return (
        <Button onClick={onClick}>Einfügen</Button>
    );
}
