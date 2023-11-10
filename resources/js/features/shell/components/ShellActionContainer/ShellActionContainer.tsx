import React, { MouseEvent } from "react";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useCmsDispatch, useCmsSelector } from "../../../../hooks/redux";
import { setActiveNode } from "../../../editor";
import { ShellActions } from "../ShellActions/ShellActions";
import classes from "./styles.module.css";
import cx from "clsx";

interface ShellActionContainerProps {
    children: JSX.Element;
}

export function ShellActionContainer(props: ShellActionContainerProps) {

    const { children } = props;
    const shell = useInertiaProps().shell as Shell;

    const isActiveNode = useCmsSelector(
        (state) => state.editor.activeNodeId === "shell"
    );
    const dispatch = useCmsDispatch();

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