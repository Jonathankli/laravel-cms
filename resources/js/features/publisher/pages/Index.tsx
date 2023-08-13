import { Container, Title } from '@mantine/core';
import { IconCheck, IconRocket, IconX } from '@tabler/icons';
import React from 'react';
import DataTable, { Column } from '../../../components/DataTable/DataTable';
import { Action } from '../../../hooks/useActions';

interface IndexProps {
    publishable: Publishable
    models: {
        data: PublishableModel[];
        meta: {
            current_page: number;
            total: number;
            last_page: number;
        }
    };
}

const columns: Column<PublishableModel>[] = [
    {
        name: "Name",
        sort: "name",
        selector: model => model.name
    },
    {
        name: "Status",
        sort: "published",
        selector: model => (
            model.published
                ? <IconCheck color='green' />
                : <IconX color="red" />
        )
    },
]

const actions: Action<PublishableModel>[] = [
    {
        Icon: IconRocket,
        route: model => `cms/admin/publisher/${model.type}`
    },
]

const Index = (props: IndexProps) => {
    const { publishable, models } = props;
    return ( 
        <Container size={"xl"}>
            <Title>Publisher: {publishable.name}</Title>
            <DataTable 
                data={models.data}
                columns={columns}
                actions={actions}
                currentPage={models.meta.current_page}
                totalPages={models.meta.last_page}
            />
        </Container>
    );
}
 
export default Index;