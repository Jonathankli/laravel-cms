import { Inertia } from "@inertiajs/inertia";
import React, { MouseEvent, useRef } from "react";
import { useCmsDispatch, useCmsSelector } from "../../../../hooks/redux";
import { useObjectPicker } from "../../../objectEditor";
import { selectAvtiveNodeId, setActiveNode } from "../../nodeSlice";
import { InsertNode } from "../InsertNode/InsertNode";
import { useStyles } from "./useStyles";

interface NodeActionContainerProps {
    node: CmsNode;
    children: React.ReactNode;
}

export function NodeActionContainer(props: NodeActionContainerProps) {
    const { node, children } = props;

    const { classes, cx } = useStyles();
    const isActiveNode = useCmsSelector(
        (state) => state.node.activeNodeId === node.id
    );
    const dispatch = useCmsDispatch();
    const openInsert = useRef("before");

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!isActiveNode) dispatch(setActiveNode(node.id));
    };

    const onObjectSelect = (obj: CmsObject) => {
        Inertia.post("/nodes", {
            ref_node: node.id,
            insert: openInsert.current,
            type: obj.type,
            settings: JSON.stringify({}),
        });
    };

    const { open } = useObjectPicker(onObjectSelect);

    const openHandlerFactory = (insert: string) => () => {
        openInsert.current = insert;
        open();
    };

    return (
        <div onMouseMove={onMouseMove}>
            {isActiveNode && (
                <InsertNode
                    openObjectPicker={openHandlerFactory("before")}
                />
            )}
            <div
                className={cx(classes.container, {
                    [classes.active]: isActiveNode,
                })}
            >
                {children}
            </div>
            {isActiveNode && (
                <InsertNode
                    openObjectPicker={openHandlerFactory("after")}
                />
            )}
        </div>
    );
}
