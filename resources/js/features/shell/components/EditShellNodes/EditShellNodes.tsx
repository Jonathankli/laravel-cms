import React, { useMemo } from "react";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { Outlet } from "../../../node";

export function EditShellNodes(props) {

    const { nodes, shell } = useInertiaProps();

    // //get the active node Id
    const rootNode = useMemo(() => {
        if(!shell) throw new Error("Shell node not found.");
        const node = (nodes as CmsNode[]).find(n => n.type === "root" && n.id === (shell as Shell).node_id);
        if(!node) throw new Error("Root node not found.");
        return node;
    }, [nodes])

    if(rootNode === null) return props.children;

    return ( 
        <Outlet nodeId={rootNode.id}/>
    );
}