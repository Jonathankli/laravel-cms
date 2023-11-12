import React from "react";
import {
    MantineProvider as MantineContextProvider,
} from "@mantine/core";

const MantineProvider = (props) => {
    return (
        <MantineContextProvider
            defaultColorScheme="light"
        >
            {props.children}
        </MantineContextProvider>
    );
};

export default MantineProvider;
