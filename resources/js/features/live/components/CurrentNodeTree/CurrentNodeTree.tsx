import React, { useMemo } from "react";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { Outlet } from "../Outlet/Outlet";

interface CurrentNodeTreeProps {
}

export function CurrentNodeTree(props: CurrentNodeTreeProps) {

    const { nodes, page } = useInertiaProps();

    // //get the active node Id
    const rootNode = useMemo(() => {
        const node = (nodes as CmsNode[]).find(n => n.type === "root" && n.id === (page as Page).node_id);
        if(!node) throw new Error("Root node not found.");
        return node;
    }, [nodes])

    return ( 
        <Outlet nodeId={rootNode.id}/>
    );
}