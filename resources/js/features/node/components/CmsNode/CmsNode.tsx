import React, { createContext, Suspense, useMemo } from "react";
import { Section } from "../../../../components/Section";
import useFrontendConfig from "../../../../hooks/config/useFrontendConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useStyles } from "./useStyles";

interface CmsNodeProps {
    node: CmsNode;
}

export const ActiveNodeContext = createContext<string>("");

export function CmsNode(props: CmsNodeProps) {

    const { node } = props;
    const objects = useFrontendConfig().objects;
    const object = objects[node.component];
    

    if(!object) {
        return <>{`Node component "${node.component}" not found!`}</>;
    }

    let Component = object.Component
    let Fallback: any = null;
    if(typeof Component === "object") {
        Fallback = Component.Fallback;
        Component = Component.Component;
    }

    return ( 
        <ActiveNodeContext.Provider value={node.id}>
            <Suspense fallback={Fallback}>
                <Component node={node} />
            </Suspense>
        </ActiveNodeContext.Provider>
    );
}