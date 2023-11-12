import React from "react";
import { Button, Container, Drawer, Group, Portal, Text, Title } from "@mantine/core";
import { useRouter } from "../../../exports";
import DataTable, { Column } from "../../../components/DataTable/DataTable";
import { IconEdit, IconEye, IconNavigation, IconTrash } from "@tabler/icons";
import { Action } from "../../../hooks/useActions";
import { ShellForm } from "../components/ShellForm/ShellForm";
import { ShellView } from "..";

interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
}

interface IndexPageProps {
    shell?: Shell;
    shells: Paginated<Shell>;
    edit?: boolean;
    newShell?: boolean;
}

const columns: Column<Shell>[] = [
    {
        name: "Name",
        sort: "name",
        selector: shell => shell.name
    },
]

const actions: Action<Shell>[] = [
    {
        Icon: IconEye,
        route: shell => `/cms/admin/shells/${shell.id}`
    },
    {
        Icon: IconEdit,
        route: shell => `/cms/admin/shells/${shell.id}/edit`
    },
    {
        Icon: IconNavigation,
        route: shell => `/cms/admin/shells/${shell.id}/editor`
    },
    {
        Icon: IconTrash,
        route: shell => ({href: `/cms/admin/shells/${shell.id}`, method: 'delete' as any}),
        confirm: true,
    },
]

const Index = (props: IndexPageProps) => {
    const router = useRouter();
    const shells = props.shells;

    const navigateIndex = () => router.get("/", {}, { preserveState: true });

    return (
        <Container pt={"md"}>
            <Portal target="#cms-header-portal-title">
                Shells
            </Portal>
            <Portal target="#cms-header-portal-right">
                <Button onClick={() => router.get('/create', {}, { preserveState: true })}>New</Button>
            </Portal>

            {/* Page List */}
            <DataTable 
                data={shells.data}
                columns={columns}
                actions={actions}
                currentPage={shells.current_page}
                totalPages={shells.last_page}
            />

            {/* Show Shell */}
            <Drawer opened={!!props.shell && !props.edit} onClose={navigateIndex}>
                {props.shell && <ShellView shell={props.shell} />}
            </Drawer>

            {/* Edit Shell */}
            <Drawer opened={!!props.shell && !!props.edit} onClose={navigateIndex}>
                <ShellForm shell={props.shell} onCancel={navigateIndex} />
            </Drawer>

            {/* New Shell */}
            <Drawer opened={!!props.newShell} onClose={navigateIndex}>
                <ShellForm onCancel={navigateIndex} />
            </Drawer>
        </Container>
    );
};

export default Index;
