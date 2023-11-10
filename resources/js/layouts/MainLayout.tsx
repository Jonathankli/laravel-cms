import React from "react";
import { AppShell } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Navi from "../components/Navi/Navi";
import { Spotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons";

export function MainLayot(props: any) {
    return (
        <ModalsProvider>
            <AppShell>
                <Navi />
                {props}
                <Spotlight
                    actions={[]}
                    searchProps={{
                        leftSection: <IconSearch size="1.2rem" />,
                        placeholder: "Search...",
                      }}
                    shortcut="mod + shift + 1"
                    nothingFound="Nothing found..."
                />
            </AppShell>
        </ModalsProvider>
    );
}
