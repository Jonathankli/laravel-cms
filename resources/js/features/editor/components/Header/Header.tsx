import React from "react";
import { Group, Portal } from "@mantine/core";
import { PageListTrigger } from "../../../page";
import { QuickPublishButton } from "../../../publisher";

interface Headerprops {
    page: Page;
}

export function Header(props: Headerprops) {
    return (
        <>
            <Portal target="#cms-header-portal-left">
                <Group justify="flex-start">
                    <PageListTrigger />
                </Group>
            </Portal>
            <Portal target="#cms-header-portal-right">
                <QuickPublishButton type="page" id={props.page.id} />
            </Portal>
        </>
    );
}
