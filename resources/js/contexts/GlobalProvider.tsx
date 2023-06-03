import { ModalsProvider } from "@mantine/modals";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store";
import MantineProvider from "./MantineProvider";

interface GlobalProvidersProps {
    children: any
}

const GlobalProviders = (props: GlobalProvidersProps) => {

    return (
        <ReduxProvider store={store}>
            <MantineProvider>
                    {props.children}
            </MantineProvider>
        </ReduxProvider>
    );
};

export default GlobalProviders;
