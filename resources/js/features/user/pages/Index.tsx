import { IconEdit, IconEye, IconTrash } from "@tabler/icons";
import React from "react";
import DataTable, { Column } from "../../../components/DataTable/DataTable";
import { Action } from "../../../hooks/useActions";
import { Button, Container, Portal } from "@mantine/core";
import { useRouter } from "../../../exports";

interface UserIndexProps {
    users: {
        data: User[];
        current_page: number;
        total: number;
        last_page: number;
    };
}

const columns: Column<User>[] = [
    {
        name: "Name",
        sort: "name",
        selector: (user) => user.name,
    },
    {
        name: "Email",
        sort: "email",
        selector: (user) => user.email,
    },
];

const actions: Action<User>[] = [
    {
        Icon: IconEye,
        route: (user) => `/admin/users/${user.id}`,
    },
    {
        Icon: IconEdit,
        route: (user) => `/admin/users/${user.id}/edit`,
    },
    {
        Icon: IconTrash,
        route: (user) => ({
            href: `/admin/users/${user.id}`,
            method: "delete" as any,
        }),
        confirm: true,
    },
];

const Index = (props: UserIndexProps) => {
    const router = useRouter();

    return (
        <Container pt={"md"}>
            <Portal target="#cms-header-portal-title">Benutzer</Portal>
            <Portal target="#cms-header-portal-right">
                <Button
                    onClick={() =>
                        router.get("/create", {}, { preserveState: true })
                    }
                >
                    New
                </Button>
            </Portal>
            <DataTable<User>
                headline="Benutzer"
                createLink={"/admin/users/create"}
                columns={columns}
                data={props.users.data}
                currentPage={props.users.current_page}
                totalPages={props.users.last_page}
                actions={actions}
            />
        </Container>
    );
};

export default Index;
