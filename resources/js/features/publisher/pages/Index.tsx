import { Button, Container, Title } from '@mantine/core';
import { IconCheck, IconRocket, IconX } from '@tabler/icons';
import React from 'react';
import DataTable, { Column } from '../../../components/DataTable/DataTable';
import { Action } from '../../../hooks/useActions';
import Link from '../../../components/Link/Link';

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


const Index = (props: IndexProps) => {
    const { publishable, models } = props;
    const actions: Action<PublishableModel>[] = [
        {
            Icon: IconRocket,
            route: model => `${publishable.type}/${model.id}`
        },
    ]
    const [selection, setSelection] = React.useState<string[]>([]);

    return ( 
        <Container size={"xl"}>
            <Title>Publisher: {publishable.name}</Title>
            <Button component={Link} href={`/${publishable.type}/multiple${selection.length ? "?" + selection.map(p => `ids[]=${p}`).join('&') : ""}`} disabled={!selection.length} variant="outline" color="blue">
                Publish Selected
            </Button>
            <DataTable 
                data={models.data}
                columns={columns}
                actions={actions}
                currentPage={models.meta.current_page}
                totalPages={models.meta.last_page}
                selection={selection}
                setSelection={setSelection}
            />
        </Container>
    );
}
 
export default Index;