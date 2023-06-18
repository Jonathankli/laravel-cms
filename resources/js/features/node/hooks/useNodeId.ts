import { useContext } from "react";
import { ActiveNodeContext } from "../contexts/ActiveNodeContext";

export function useNodeId() {
    return useContext(ActiveNodeContext);
}