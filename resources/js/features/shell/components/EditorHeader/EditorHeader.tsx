import React from "react";
import { AppShell, Container, Group, Portal } from "@mantine/core";
import classes from "./styles.module.css";
import { BackToPageButton } from "../..";
import { QuickPublishButton } from "../../../publisher";

export function EditorHeader(props: any) {
    return (
        <>
            <Portal target="#cms-header-portal-left">
                <Group justify="flex-start">
                    <BackToPageButton />
                </Group>
            </Portal>
            <Portal target="#cms-header-portal-right">
                <QuickPublishButton type="shell" id={props.shell.id} />
            </Portal>
        </>
    );
}
