import { useContext } from "react";
import { ShellContext } from "../contexts/ShellContext";

export function useInShell() {
    return useContext(ShellContext).inShell;
}