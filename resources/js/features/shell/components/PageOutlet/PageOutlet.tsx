import React, { useContext } from "react";
import { ShellContext } from "../../contexts/ShellContext";

export function PageOutlet() {
    const state = useContext(ShellContext);
    return (
        <ShellContext.Provider value={{...state, children: undefined, inShell: false}}>
            {state.children}
        </ShellContext.Provider>
    );
}
