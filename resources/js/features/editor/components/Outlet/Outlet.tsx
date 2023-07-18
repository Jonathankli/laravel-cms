import React, { useMemo } from "react";
import { OutletProps } from "../../../../components/Outlet/Outlet";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useNodeId } from "../../hooks/useNodeId";
import { CmsNode } from "../CmsNode/CmsNode";
import { EmptyOutlet } from "../EmptyOutlet/EmptyOutlet";
import { NodeActionContainer } from "../NodeActionContainer/NodeActionContainer";

export function Outlet(props: OutletProps) {
    const { index = 0, nodeId } = props;
    const dynamicNodeId = useNodeId();
    const { nodes } = useInertiaProps();
    const id = nodeId ? nodeId : dynamicNodeId;

    //get children of current node
    const children = useMemo(() => {
        return (nodes as CmsNode[])
            .filter((n) => n.parent_id === id && index === n.outlet)
            .sort((a, b) => a.index - b.index);
    }, [nodeId, dynamicNodeId, nodes, index]);

    if (!children.length) {
        return <EmptyOutlet nodeId={id} index={index} />;
    }

    return (
        <>
            {children.map((node) => (
                <NodeActionContainer key={node.id} node={node}>
                    <CmsNode node={node} />
                </NodeActionContainer>
            ))}
        </>
    );
}
