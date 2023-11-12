import React from "react";
import {
    Table,
    Checkbox,
    ScrollArea,
    ActionIcon,
    Group,
    Input,
    Pagination,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import useFilter from "../../hooks/useFilter";
import TableHead from "./TableHead";
import useActions, { Action } from "../../hooks/useActions";
import classes from "./styles.module.css"

export interface Column<T> {
    selector: (column: T) => React.ReactNode;
    sort?: string;
    name: string;
}

interface TableSelectionProps<T> {
    data: T[];
    headline?: string;
    columns: Column<T>[];
    actions?: Action<T>[];
    pirmaryKey?: string;
    currentPage: number;
    totalPages: number;
    createLink?: string;
    setSelection?: React.Dispatch<React.SetStateAction<string[]>>
    selection?: string[];
}

function DataTable<T>(props: TableSelectionProps<T>) {
    const {
        data,
        pirmaryKey = "id",
        actions = [],
        columns,
        totalPages,
        selection = [],
        setSelection,
    } = props;

    const actionIcons = useActions(actions);

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
        setSelection && setSelection((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    const toggleAll = () =>
        setSelection && setSelection((current) =>
            current.length === data.length
                ? []
                : data.map((item) => item[pirmaryKey])
        );

    const rows = data.map((item) => {
        const selected = selection.includes(item[pirmaryKey]);

        const fields = columns.map((col) => <td>{col.selector(item)}</td>);

        return (
            <Table.Tr
                key={item[pirmaryKey]}
                bg={selected ? 'var(--mantine-color-blue-light)' : undefined}
            >
                {setSelection && (
                    <Table.Td>
                        <Checkbox
                            checked={selection.includes(item[pirmaryKey])}
                            onChange={() => toggleRow(item[pirmaryKey])}
                        />
                    </Table.Td>
                )}
                {fields}
                <Table.Td>
                    <Group justify="flex-end" gap="xs">
                        {actionIcons(item)}
                    </Group>
                </Table.Td>
            </Table.Tr>
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
        <>
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
                <Table style={{ minWidth: 800 }} verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            {setSelection && (
                                <Table.Th className={classes.th}>
                                    <Checkbox
                                        onChange={toggleAll}
                                        checked={selection.length === data.length}
                                        indeterminate={
                                            selection.length > 0 &&
                                            selection.length !== data.length
                                        }
                                    />
                                </Table.Th>
                            )}
                            {headder}
                            <Table.Th className={classes.th}></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
            <Pagination
                value={page}
                onChange={switchPage}
                total={totalPages}
                py={"lg"}
            />
        </>
    );
}

export default DataTable;
