import {
    MantineProvider as MantineContextProvider,
} from "@mantine/core";
import React from "react";

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
