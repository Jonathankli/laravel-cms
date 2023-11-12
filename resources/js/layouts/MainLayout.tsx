import React from "react";
import {
    AppShell,
    Burger,
    Flex,
    Group,
    MantineProvider,
    Text,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Navi from "../components/Navi/Navi";
import { Spotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons";

export function MainLayot(props: any) {
    return (
        <ModalsProvider>
            <AppShell
                navbar={{ width: 56, breakpoint: "sm" }}
                header={{ height: 56 }}
            >
                <AppShell.Header>
                    <Flex direction={"row"} h="100%">
                        <Flex
                            w={56}
                            h="100%"
                            justify={"center"}
                            align={"center"}
                        >
                            <Burger />
                        </Flex>
                        <Flex
                            style={{ flex: 1 }}
                            h="100%"
                            px="md"
                            justify="space-between"
                        >
                            <Flex
                                style={{ flex: 1 }}
                                h="100%"
                                justify={"left"}
                                align={"center"}
                                id="cms-header-portal-left"
                            />
                            <Flex
                                style={{ flex: 0 }}
                            >
                                <Flex
                                    justify={"center"}
                                    h="100%"
                                    align={"center"}
                                >
                                    <Text fw="bold" style={{ whiteSpace: "nowrap" }} id="cms-header-portal-title"></Text>
                                </Flex>
                            </Flex>
                            <Flex
                                style={{ flex: 1 }}
                                h="100%"
                                justify={"right"}
                                align={"center"}
                                id="cms-header-portal-right"
                            />
                        </Flex>
                    </Flex>
                </AppShell.Header>
                <Navi />
                <AppShell.Main>
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
                </AppShell.Main>
            </AppShell>
        </ModalsProvider>
    );
}
