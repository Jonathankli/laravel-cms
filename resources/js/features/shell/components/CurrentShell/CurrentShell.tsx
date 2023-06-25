import React, { useMemo } from "react";
import { Outlet } from "../../../../exports";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { ShellContext } from "../../contexts/ShellContext";
import { useShell } from "../../hooks/useShell";

interface CurrentShellProps {
    children: JSX.Element;
}

export function CurrentShell(props: CurrentShellProps) {

    const { nodes, shell } = useInertiaProps();

    // //get the active node Id
    const rootNode = useMemo(() => {
        if(!shell) return null;
        const node = (nodes as CmsNode[]).find(n => n.type === "root" && n.id === (shell as Shell).node_id);
        if(!node) throw new Error("Root node not found.");
        return node;
    }, [nodes])

    if(rootNode === null) return props.children;

    return ( 
        <ShellContext.Provider value={{shell: shell as Shell, children: props.children, inShell: true}}>
            <Outlet nodeId={rootNode.id}/>
        </ShellContext.Provider>
    );
}