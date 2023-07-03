import React from "react";
import { UnstyledButton, Group, Text, Center, createStyles } from "@mantine/core";
import {
    IconSelector,
    IconChevronDown,
    IconChevronUp,
} from "@tabler/icons";

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sortBy?: string | null;
    sortKey?: string;
    onSort(key: string): void;
}

const useStyles = createStyles((theme) => ({
    th: {
        padding: "0 !important",
    },

    control: {
        width: "100%",
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    icon: {
        width: 21,
        height: 21,
        borderRadius: 21,
    },
}));

function TableHead({ children, reversed, sortBy, sortKey, onSort }: ThProps) {
    const { classes } = useStyles();
    const Icon = !!sortBy && sortBy === sortKey
        ? reversed
            ? IconChevronUp
            : IconChevronDown
        : IconSelector;

    return (
        <th className={classes.th}>
            {sortKey ? (
                <UnstyledButton onClick={() => onSort(sortKey)} className={classes.control}>
                    <Group position="apart">
                        <Text weight={500} size="sm">
                            {children}
                        </Text>
                        <Center className={classes.icon}>
                            <Icon size={14} stroke={1.5} />
                        </Center>
                    </Group>
                </UnstyledButton>
            ) : (
                <Text weight={500} size="sm">
                    {children}
                </Text>
            )}
        </th>
    );
}

export default TableHead;
