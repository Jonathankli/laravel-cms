import React from "react";
import { AppShell } from "@mantine/core";
import Navi from "../components/Navi/Navi";
import { SpotlightProvider } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons";

export function MainLayot(props: any) {
    return <AppShell navbar={<Navi />}>
        <SpotlightProvider
            actions={[]}
            searchIcon={<IconSearch size="1.2rem" />}
            searchPlaceholder="Search..."
            shortcut="mod + shift + 1"
            nothingFoundMessage="Nothing found..."
        >
            {props}
        </SpotlightProvider>
    </AppShell>;
}
