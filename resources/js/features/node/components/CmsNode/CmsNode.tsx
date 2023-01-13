import React, { createContext, useMemo } from "react";
import { Section } from "../../../../components/Section";
import { useStyles } from "./useStyles";

interface CmsNodeProps {
    node: CmsNode;
}

export const ActiveNodeContext = createContext<string>("");

export function CmsNode(props: CmsNodeProps) {

    const { node } = props;

    const { classes } = useStyles();

    return ( 
        <ActiveNodeContext.Provider value={node.id}>
            <div className={classes.container}>
                <Section node={node} />
            </div>
        </ActiveNodeContext.Provider>
    );
}