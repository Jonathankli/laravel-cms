import { Container, Group, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import React from "react";
import DataView, { Row } from "../../../components/DataView/DataView";
import useActions, { Action } from "../../../hooks/useActions";

interface UserIndexProps {
    user: User;
}

const rows: Row<User>[] = [
    {
        name: "Name",
        selector: (user) => user.name,
    },
    {
        name: "Email",
        selector: (user) => user.email,
    },
];

const Show = (props: UserIndexProps) => {
    const actions: Action<User>[] = [
        {
            Icon: IconEdit,
            route: `/admin/users/${props.user.id}/edit`,
        },
        {
            Icon: IconTrash,
            route: { href: `/admin/users/${props.user.id}`, method: "delete" as any},
            confirm: true,
            confirmMessage:
                "Wollen Sie wirklich den Benutzer " +
                props.user.name +
                " Löschen?",
        },
    ];

    const actionIcons = useActions(actions)(props.user);

    return (
        <Container px={"md"} size="lg">
            <Group>
                <Title order={1} py={"lg"} style={{ flex: 1 }}>
                    Benutzer: {props.user.name}
                </Title>
                {actionIcons.length && (
                    <Group py="lg" position="right">
                        {actionIcons}
                    </Group>
                )}
            </Group>
            <DataView
                rows={rows}
                data={props.user}
            />
        </Container>
    );
};

export default Show;
