import React, { useMemo } from "react";
import { OutletProps } from "../../../../components/Outlet/Outlet";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useNodeId } from "../../../node/live";
import { LiveNode } from "../LiveNode/LiveNode";

export function Outlet(props: OutletProps) {
    const { index = 0, nodeId } = props;
    const dynamicNodeId = useNodeId();
    const { nodes } = useInertiaProps();
    const id = nodeId ? nodeId : dynamicNodeId;

    //get children of current node
    const children = useMemo(() => {
        return (nodes as CmsNode[])
            .filter((n) => n.parent === id && index === n.outlet)
            .sort((a, b) => a.index - b.index);
    }, [nodeId, dynamicNodeId, nodes, index]);

    if (!children.length) {
        return <></>;
    }

    return (
        <>
            {children.map((node) => (
                <LiveNode key={node.id} node={node} />
            ))}
        </>
    );
}
