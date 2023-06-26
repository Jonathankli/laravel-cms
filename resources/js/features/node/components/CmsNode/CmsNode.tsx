import React, { createContext, Suspense, useEffect, useMemo } from "react";
import { Section } from "../../../../components/Section";
import useFrontendConfig from "../../../../hooks/config/useFrontendConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useCmsSelector } from "../../../../hooks/redux";
import { ActiveNodeContext } from "../../contexts/ActiveNodeContext";
import { useStyles } from "./useStyles";

interface CmsNodeProps {
    node: CmsNode;
}

export function CmsNode(props: CmsNodeProps) {

    const { node } = props;
    const serverEditNode = useInertiaProps().editNode as CmsNode | undefined;
    const localEditNode = useCmsSelector(state => {
        if(state.cmsObject.editNode?.id === node.id) {
            return state.cmsObject.editNode;
        }
        return null;
    });
    const editNode = useMemo(() => {
        if(localEditNode === null) return null;
        return {
            ...localEditNode,
            data: serverEditNode?.data ?? localEditNode?.data,
        }
    }, [localEditNode, serverEditNode])
    const objects = useFrontendConfig().objects;
    const object = objects[node.component];

    const _node = useMemo(() => ({
        ...node,
        ...editNode,
    }), [node, editNode, serverEditNode]);
    

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
                <Component node={_node} settings={_node.settings} data={_node.data} />
            </Suspense>
        </ActiveNodeContext.Provider>
    );
}