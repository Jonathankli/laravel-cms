import React, { MouseEvent } from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useCmsDispatch, useCmsSelector } from "../../../../hooks/redux";
import { setActiveNode } from "../../../node";
import { ShellActions } from "../ShellActions/ShellActions";
import { useStyles } from "./useStyles";

interface ShellActionContainerProps {
    children: JSX.Element;
}

export function ShellActionContainer(props: ShellActionContainerProps) {

    const { children } = props;
    const shell = useInertiaProps().shell as Shell;

    const { classes, cx } = useStyles();
    const isActiveNode = useCmsSelector(
        (state) => state.node.activeNodeId === "shell"
    );
    const dispatch = useCmsDispatch();
    const config = useServerConfig();

    if(!shell) return children;

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!isActiveNode) dispatch(setActiveNode("shell"));
    };


    return (
        <div className={classes.outer} onMouseMove={onMouseMove}>
            {isActiveNode &&
                <ShellActions />
            }
            <div
                className={cx(classes.container, {
                    [classes.active]: isActiveNode,
                })}
            >
                {children}
            </div>
        </div>
    );
}