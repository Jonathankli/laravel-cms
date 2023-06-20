import { createEmotionCache } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store";
import MantineProvider from "./MantineProvider";

interface GlobalProvidersProps {
    children: any
}


const appendCache = createEmotionCache({ key: 'mantine', prepend: false });

const GlobalProviders = (props: GlobalProvidersProps) => {

    return (
        <ReduxProvider store={store}>
            <MantineProvider emotionCache={appendCache} >
                    {props.children}
            </MantineProvider>
        </ReduxProvider>
    );
};

export default GlobalProviders;
