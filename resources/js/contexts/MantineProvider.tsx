import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider as MantineContextProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React from "react";

const MantineProvider = (props) => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineContextProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme,
                }}
            >
                {props.children}
            </MantineContextProvider>
        </ColorSchemeProvider>
    );
};

export default MantineProvider;
