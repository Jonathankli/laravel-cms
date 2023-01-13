import React, { createContext, useMemo } from "react";
import { Section } from "../../../../components/Section";
import { InsertNode } from "../InsertNode/InsertNode";
import { useStyles } from "./useStyles";

interface NodeActionContainerProps {
    node: CmsNode;
    children: React.ReactNode
}

export function NodeActionContainer(props: NodeActionContainerProps) {
    const { node, children } = props;

    return ( 
        <>
            <InsertNode/>
            {children}
            <InsertNode/>
        </>
    );
}