import { useContext } from "react";
import { ShellContext } from "../contexts/ShellContext";

export function useShell() {
    return useContext(ShellContext).shell;
}