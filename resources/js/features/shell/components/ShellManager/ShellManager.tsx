import React, { useEffect, useState } from "react";
import {
    ActionIcon,
    Button,
    Drawer,
    Group,
    LoadingOverlay,
    Table,
} from "@mantine/core";
import { IconBrowser, IconEdit, IconEye, IconTrash } from "@tabler/icons";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { router } from "@inertiajs/react";
import { useStyles } from "./styles";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import { closeModal, openConfirmModal, openModal } from "@mantine/modals";
import { ShellForm } from "../ShellForm/ShellForm";

interface ShellManagerProps {
    open: boolean;
    close(): void;
}

export function ShellManager(props: ShellManagerProps) {
    const { classes } = useStyles();
    const shells = (useInertiaProps().shells as Shell[]) ?? [];
    const [isLoading, setIsLoading] = useState<boolean>(props.open);
    const config = useServerConfig();

    useEffect(() => {
        if (!props.open) return;
        router.reload({
            only: ["shells"],
            onBefore: () => {
                setIsLoading(true);
            },
            onFinish: () => {
                setIsLoading(false);
            },
        });
    }, [props.open]);

    const navigateToShowShell = (shell: Shell) => {
        router.get(`${config.paths.admin}/shells/${shell.id}/edit`);
    };
    const deleteShell = (shell: Shell) => {
        openConfirmModal({
            title: "Shell löschen?",
            labels: {
                cancel: "Abbrechen",
                confirm: "Löschen",
            },
            onConfirm: () => {
                router.delete(`${config.paths.admin}/shells/${shell.id}`, {
                    onSuccess: () =>
                        router.reload({
                            only: ["shells"],
                            onBefore: () => {
                                setIsLoading(true);
                            },
                            onFinish: () => {
                                setIsLoading(false);
                            },
                        }),
                });
            },
        });
    };
    const openNewShellModal = () => {
        openModal({
            title: "Create New Shell",
            children: (
                <ShellForm
                    onSuccess={() => router.reload({ only: ["shells"] })}
                />
            ),
        });
    };
    const openEditShellModal = (shell: Shell) => {
        openModal({
            modalId: "edit-shell",
            title: "Update Shell",
            children: (
                <ShellForm
                  shell={shell}
                  onSuccess={() => {
                    router.reload({ only: ["shells"] });
                    closeModal("edit-shell");
                  }}
                />
            ),
        });
    };

    return (
        <Drawer
            opened={props.open}
            onClose={props.close}
            title="Shells"
            padding="md"
            size="md"
        >
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <Table>
              <tbody>
                {shells.map((shell) => (
                    <tr key={shell.id}>
                        <td>{shell.name}</td>
                        <td>
                            <Group position="right" spacing={"xs"}>
                                <ActionIcon
                                    size={"sm"}
                                    variant="outline"
                                    color="blue"
                                    onClick={navigateToShowShell.bind(
                                        this,
                                        shell
                                    )}
                                >
                                    <IconEye size="0.875rem" />
                                </ActionIcon>
                                <ActionIcon
                                    size={"sm"}
                                    variant="outline"
                                    color="blue"
                                    onClick={openEditShellModal.bind(
                                        this,
                                        shell
                                    )}
                                >
                                    <IconEdit size="0.875rem" />
                                </ActionIcon>
                                <ActionIcon
                                    size={"sm"}
                                    variant="outline"
                                    color="red"
                                    onClick={deleteShell.bind(this, shell)}
                                >
                                    <IconTrash size="0.875rem" />
                                </ActionIcon>
                            </Group>
                        </td>
                    </tr>
                ))}
              </tbody>
            </Table>
            <Group
                position="apart"
                p={"sm"}
                className={classes.buttonContainer}
            >
                <Button onClick={openNewShellModal}>New</Button>
            </Group>
        </Drawer>
    );
}
