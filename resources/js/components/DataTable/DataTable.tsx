import React, { useState } from "react";
import {
    createStyles,
    Table,
    Checkbox,
    ScrollArea,
    ActionIcon,
    Group,
    Input,
    Title,
    Container,
    Pagination,
    Button,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import useFilter from "../../hooks/useFilter";
import TableHead from "./TableHead";
import useActions, { Action } from "../../hooks/useActions";
import { Link } from "@inertiajs/react";

const useStyles = createStyles((theme) => ({
    rowSelected: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
                : theme.colors[theme.primaryColor][0],
    },
}));

export interface Column<T> {
    selector: (column: T) => React.ReactNode;
    sort?: string;
    name: string;
}

interface TableSelectionProps<T> {
    data: T[];
    headline: string;
    columns: Column<T>[];
    actions?: Action<T>[];
    pirmaryKey?: string;
    currentPage: number;
    totalPages: number;
    createLink?: string;
}

function DataTable<T>(props: TableSelectionProps<T>) {
    const {
        data,
        pirmaryKey = "id",
        actions = [],
        columns,
        headline,
        totalPages,
        createLink,
    } = props;

    const { classes, cx } = useStyles();
    const actionIcons = useActions(actions);
    const [selection, setSelection] = useState<any[]>([]);
    const {
        updateSorting,
        submitSearch,
        sortBy,
        reverseSortDirection,
        setSearch,
        search,
        switchPage,
        page,
    } = useFilter();

    const toggleRow = (id: string) =>
        setSelection((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    const toggleAll = () =>
        setSelection((current) =>
            current.length === data.length
                ? []
                : data.map((item) => item[pirmaryKey])
        );

    const rows = data.map((item) => {
        const selected = selection.includes(item[pirmaryKey]);

        const fields = columns.map((col) => <td>{col.selector(item)}</td>);

        return (
            <tr
                key={item[pirmaryKey]}
                className={cx({ [classes.rowSelected]: selected })}
            >
                <td>
                    <Checkbox
                        checked={selection.includes(item[pirmaryKey])}
                        onChange={() => toggleRow(item[pirmaryKey])}
                        transitionDuration={0}
                    />
                </td>
                {fields}
                <td>
                    <Group position="right" spacing="xs">
                        {actionIcons(item)}
                    </Group>
                </td>
            </tr>
        );
    });

    const headder = columns.map((col) => (
        <TableHead
            key={col.name}
            reversed={reverseSortDirection}
            sortKey={col.sort}
            sortBy={sortBy}
            onSort={updateSorting}
        >
            {col.name}
        </TableHead>
    ));

    return (
        <Container px={"md"} size="lg">
            <Title order={1} py={"lg"}>
                <Group position="apart">
                    <Title>{headline}</Title>
                    {createLink && (
                        <Button<typeof Link>
                            component={Link}
                            href={createLink}
                        >
                            Neu
                        </Button>
                    )}
                </Group>
            </Title>
            <Input
                placeholder="Suche"
                rightSection={
                    <ActionIcon variant="default" onClick={submitSearch}>
                        <IconSearch size={18} style={{ display: "block" }} />
                    </ActionIcon>
                }
                value={search}
                onKeyPress={(e) => e.key === "Enter" && submitSearch()}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ScrollArea>
                <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                    <thead>
                        <tr>
                            <th style={{ width: 40 }}>
                                <Checkbox
                                    onChange={toggleAll}
                                    checked={selection.length === data.length}
                                    indeterminate={
                                        selection.length > 0 &&
                                        selection.length !== data.length
                                    }
                                    transitionDuration={0}
                                />
                            </th>
                            {headder}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
            <Pagination
                value={page}
                onChange={switchPage}
                total={totalPages}
                position="center"
                py={"lg"}
            />
        </Container>
    );
}

export default DataTable;
