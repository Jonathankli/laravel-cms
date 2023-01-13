import { useContext, useMemo } from "react";
import useInertiaProps from "../../../hooks/inertia/useInertiaProps";
import { ActiveNodeContext } from "../components/CmsNode/CmsNode";
import { useNodeId } from "./useNodeId";

export function useNode(): CmsNode {
    const id = useNodeId();
    const { nodes } = useInertiaProps();
    const node = useMemo(() => {
        const node = (nodes as CmsNode[]).find(n => n.id === id);
        if(!node) throw new Error(`Node with id ${id} not found.`);
        return node;
    }, [id, nodes]);
    return node;
}