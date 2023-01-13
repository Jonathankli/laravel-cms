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

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        dispatch(setActiveNode(node.id));
    }

    return ( 
        <>
            <InsertNode/>
            <div className={cx(classes.container, { [classes.active]: activeNodeId === node.id })} onMouseMove={onMouseMove}>
                {children}
            </div>
            <InsertNode/>
        </>
    );
}