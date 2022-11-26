import React from "react";
import MantineProvider from "./MantineProvider";

const GlobalProviders = (props) => {

    return (
        <MantineProvider>
            {props.children}
        </MantineProvider>
    );
};

export default GlobalProviders;
