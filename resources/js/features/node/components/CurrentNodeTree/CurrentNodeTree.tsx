import React, { useMemo } from "react";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { CmsNode } from "../CmsNode/CmsNode";
import { NodeActionContainer } from "../NodeActionContaibner/NodeActionContainer";
import { Outlet } from "../Outlet/Outlet";

interface CurrentNodeTreeProps {
}

export function CurrentNodeTree(props: CurrentNodeTreeProps) {

    const { nodes } = useInertiaProps();

    // //get the active node Id
    const rootNode = useMemo(() => {
        const node = (nodes as CmsNode[]).find(n => n.type === "root");
        if(!node) throw new Error("Root node not found.");
        return node;
    }, [nodes])

    return ( 
        <NodeActionContainer node={rootNode}>
            <Outlet nodeId={rootNode.id}/>
        </NodeActionContainer>
    );
}