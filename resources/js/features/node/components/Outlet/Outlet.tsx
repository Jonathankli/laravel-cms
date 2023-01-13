import React, { createContext, useMemo } from "react";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useNodeId } from "../../hooks/useNodeId";
import { CmsNode } from "../CmsNode/CmsNode";
import { EmptyOutlet } from "../EmptyOutlet/EmptyOutlet";
import { InsertNode } from "../InsertNode/InsertNode";
import { useStyles } from "./useStyles";

interface OutletProps {
    index?: number;
    nodeId?: string;
}

export function Outlet(props: OutletProps) {
    const { index = 0, nodeId } = props;
    // const { classes } = useStyles();
    const dynamicNodeId = useNodeId();
    const { nodes } = useInertiaProps();

    //get children of current node
    const children = useMemo(() => {
        const id = nodeId ? nodeId : dynamicNodeId;
        return (nodes as CmsNode[])
            .filter((n) => n.parent === id && index === n.outlet)
            .sort((a, b) => a.index - b.index);
    }, [nodeId, dynamicNodeId, nodes, index]);

    if (!children.length) {
        return <EmptyOutlet />;
    }

    return (
        <>
        <InsertNode />
            {children.map((node) => (
                <>
                    <CmsNode key={node.id} node={node} />
                    <InsertNode />
                </>
            ))}
        </>
    );
}
