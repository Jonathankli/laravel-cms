import React, { useContext } from "react";
import useEntityType, { EntityType } from "../../../../hooks/useEntityType";
import { ShellContext } from "../../contexts/ShellContext";

const pageOutletStyle = {
    width: "100%",
    minHeight: "300px",
    height: "100%",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

export function PageOutlet() {
    const state = useContext(ShellContext);
    const entityType = useEntityType();
    
    return (
        <ShellContext.Provider value={{...state, children: undefined, inShell: false}}>
            {entityType === EntityType.SHELL
                ? <div style={pageOutletStyle}>
                    <p>Page Outlet</p>
                </div>
                : state.children
            }
        </ShellContext.Provider>
    );
}
