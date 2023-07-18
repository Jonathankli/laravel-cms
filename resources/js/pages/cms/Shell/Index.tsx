import React, { useState } from "react";
import { Button, Container, Drawer, Group, Title } from "@mantine/core";
import PageTree from "../../../features/page/components/PageTree/PageTree";
import { useRouter } from "../../../exports";
import { PageForm, PageView } from "../../../features/page";
import DataTable, { Column } from "../../../components/DataTable/DataTable";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons";
import { Action } from "../../../hooks/useActions";
import { ShellForm } from "../../../features/shell/components/ShellForm/ShellForm";
import { ShellView } from "../../../features/shell";

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
        <Container>
            <Group position="apart" pb={"md"}>
                <Title>Shells</Title>
                <Button onClick={() => router.get('/create', {}, { preserveState: true })}>New</Button>
            </Group>

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
