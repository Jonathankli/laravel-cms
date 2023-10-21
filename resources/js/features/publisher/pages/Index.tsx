import {
    Button,
    Container,
    ThemeIcon,
    Title,
    Tooltip,
} from "@mantine/core";
import {
    IconCheck,
    IconPencil,
    IconRefresh,
    IconRocket,
    IconTrash,
} from "@tabler/icons";
import React from "react";
import DataTable, { Column } from "../../../components/DataTable/DataTable";
import { Action } from "../../../hooks/useActions";
import Link from "../../../components/Link/Link";

interface IndexProps {
    publishable: Publishable;
    models: {
        data: PublishableModel[];
        meta: {
            current_page: number;
            total: number;
            last_page: number;
        };
    };
}

const getStatusIcon = (model: PublishableModel) => {
    if (model.deleted) {
        return (
            <Tooltip label="Deleted">
                <ThemeIcon variant="light" color="red">
                    <IconTrash />
                </ThemeIcon>
            </Tooltip>
        );
    }
    switch (model.published) {
        case "draft":
            return (
                <Tooltip label="Draft">
                    <ThemeIcon variant="light" color="gray">
                        <IconPencil />
                    </ThemeIcon>
                </Tooltip>
            );
        case "published":
            return (
                <Tooltip label="Published">
                    <ThemeIcon variant="light" color="green">
                        <IconCheck />
                    </ThemeIcon>
                </Tooltip>
            );
        case "updated":
            return (
                <Tooltip label="Updated">
                    <ThemeIcon variant="light" color="yellow">
                        <IconRefresh />
                    </ThemeIcon>
                </Tooltip>
            );
        default:
            return null;
    }
};

const columns: Column<PublishableModel>[] = [
    {
        name: "Name",
        sort: "name",
        selector: (model) => model.name,
    },
    {
        name: "Status",
        sort: "published",
        selector: getStatusIcon,
    },
];

const Index = (props: IndexProps) => {
    const { publishable, models } = props;
    const actions: Action<PublishableModel>[] = [
        {
            Icon: IconRocket,
            route: (model) => `${publishable.type}/${model.id}`,
        },
    ];
    const [selection, setSelection] = React.useState<string[]>([]);

    return (
        <Container size={"xl"}>
            <Title>Publisher: {publishable.name}</Title>
            <Button
                component={Link}
                href={`/${publishable.type}/multiple${
                    selection.length
                        ? "?" + selection.map((p) => `ids[]=${p}`).join("&")
                        : ""
                }`}
                disabled={!selection.length}
                variant="outline"
                color="blue"
            >
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
};

export default Index;
