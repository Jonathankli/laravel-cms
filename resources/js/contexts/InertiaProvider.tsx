import { ErrorBag, Errors, PageProps } from "@inertiajs/inertia";
import React, { createContext } from "react";

export type InertiaPageProps = PageProps & {
    errors: Errors & ErrorBag;
};

interface InertiaProviderProps {
    props: InertiaPageProps,
    children: any
}

export const InertiaContext = createContext<InertiaPageProps>({
    errors: {}
})

const InertiaProvider = (props: InertiaProviderProps) => {
    
    return (
        <InertiaContext.Provider value={props.props}>
            {props.children}
        </InertiaContext.Provider>
    );
};

export default InertiaProvider;
