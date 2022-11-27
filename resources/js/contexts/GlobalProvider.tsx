import React from "react";
import InertiaProvider, { InertiaPageProps } from "./InertiaProvider";
import MantineProvider from "./MantineProvider";

interface GlobalProvidersProps {
    inertiaProps: InertiaPageProps,
    children: any
}


const GlobalProviders = (props: GlobalProvidersProps) => {

    return (
        <InertiaProvider props={props.inertiaProps}>
            <MantineProvider>
                {props.children}
            </MantineProvider>
        </InertiaProvider>
    );
};

export default GlobalProviders;
