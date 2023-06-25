import { createContext } from "react";

export interface ShellContextState {
    shell?: Shell;
    children?: any;
    inShell: boolean;
}

export const ShellContext = createContext<ShellContextState>({inShell: false});