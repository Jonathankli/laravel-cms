import { useContext } from "react";
import { ActiveNodeContext } from "../components/CmsNode/CmsNode";

export function useNodeId() {
    return useContext(ActiveNodeContext);
}