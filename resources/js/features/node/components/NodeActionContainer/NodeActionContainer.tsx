import { router } from "@inertiajs/react";
import React, { MouseEvent, useRef } from "react";
import { useCmsDispatch, useCmsSelector } from "../../../../hooks/redux";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import { useObjectPicker } from "../../../cmsObject";
import { setActiveNode } from "../../nodeSlice";
import { InsertNode } from "../InsertNode/InsertNode";
import { useStyles } from "./useStyles";
import { NodeActions } from "../NodeActions/NodeActions";

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
    const config = useServerConfig();

    const onObjectSelect = (obj: CmsObject) => {
        router.post(config.paths.admin+"/nodes", {
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
            {isActiveNode && <>
                <InsertNode
                    openObjectPicker={openHandlerFactory("before")}
                />
                <NodeActions />
            </>}
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
