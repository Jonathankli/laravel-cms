import React, { Suspense } from "react";
import useFrontendConfig from "../../../../hooks/config/useFrontendConfig";
import { ActiveNodeContext } from "../../../editor/live";

interface LiveNodeProps {
    node: CmsNode;
}

export function LiveNode(props: LiveNodeProps) {

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
                <Component node={node} settings={node.settings} data={node.data} />
            </Suspense>
        </ActiveNodeContext.Provider>
    );
}