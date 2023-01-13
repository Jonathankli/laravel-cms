import React, { MouseEvent } from "react";
import { useCmsDispatch, useCmsSelector } from "../../../../hooks/redux";
import { selectAvtiveNodeId, setActiveNode } from "../../nodeSlice";
import { InsertNode } from "../InsertNode/InsertNode";
import { useStyles } from "./useStyles";

interface NodeActionContainerProps {
    node: CmsNode;
    children: React.ReactNode
}

export function NodeActionContainer(props: NodeActionContainerProps) {
    const { node, children } = props;

    const { classes, cx } = useStyles();
    const activeNodeId = useCmsSelector(selectAvtiveNodeId);
    const dispatch = useCmsDispatch();
    const isActiveNode = activeNodeId === node.id;

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        dispatch(setActiveNode(node.id));
    }

    return ( 
        <div onMouseMove={onMouseMove} style={{minHeight: "100%"}}>
            {isActiveNode && <InsertNode/>}
            <div className={cx(classes.container, { [classes.active]: isActiveNode})}>
                {children}
            </div>
            {isActiveNode && <InsertNode/>}
        </div>
    );
}