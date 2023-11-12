import React from "react";
import { UnstyledButton, Group, Text, Center, Table, rem } from "@mantine/core";
import {
    IconSelector,
    IconChevronDown,
    IconChevronUp,
} from "@tabler/icons";
import classes from "./styles.module.css";

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sortBy?: string | null;
    sortKey?: string;
    onSort(key: string): void;
}

function TableHead({ children, reversed, sortBy, sortKey, onSort }: ThProps) {
    const Icon = !!sortBy && sortBy === sortKey
        ? reversed
            ? IconChevronUp
            : IconChevronDown
        : IconSelector;

    return (
        <Table.Th className={classes.th}>
            {sortKey ? (
                <UnstyledButton onClick={() => onSort(sortKey)} className={classes.control}>
                    <Group justify="space-between">
                        <Text fw={500} size="sm">
                            {children}
                        </Text>
                        <Center className={classes.icon}>
                            <Icon size={14} stroke={1.5} />
                        </Center>
                    </Group>
                </UnstyledButton>
            ) : (
                <Text fw={500} size="sm">
                    {children}
                </Text>
            )}
        </Table.Th>
    );
}

export default TableHead;
