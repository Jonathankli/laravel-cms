import React, { useMemo, useRef } from "react";
import {
    DndProvider,
    getBackendOptions,
    MultiBackend,
    NodeModel,
    RenderParams,
    Tree,
} from "@minoru/react-dnd-treeview";
import {
    ActionIcon,
    Container,
    Divider,
    Flex,
    Group,
    Text,
} from "@mantine/core";
import {
    IconChevronDown,
    IconChevronRight,
    IconEdit,
    IconNavigation,
    IconSettings,
    IconTrash,
} from "@tabler/icons";
import { useStyles } from "./styles";
import { useRouter } from "../../../../exports";
import { openConfirmModal } from "@mantine/modals";

interface ListItemProps extends RenderParams {
    node: NodeModel<Page>;
}

const ListItem = (props: ListItemProps) => {
    const { node, hasChild, depth, isOpen, onToggle } = props;
    const page = node.data;
    
    const { classes } = useStyles();
    const router = useRouter();

    let padding = depth * 30;
    if (!hasChild) padding += 20;

    if(!page) {
        throw new Error("Page not found");
    }

    const onDelete = () => {
        openConfirmModal({
            title: "Seite löschen?",
            labels: {
                cancel: "Abbrechen",
                confirm: "Löschen",
            },
            onConfirm: () => {
                router.delete(`${page.id}`)
            }
        })
    }

    return (
        <div onClick={() => null}>
            <Flex justify={"space-between"} align={"center"}>
                <Flex
                    className={classes.pageNameContainer}
                    align={"center"}
                    style={{ paddingLeft: padding + "px" }}
                >
                    {hasChild && (
                        <span
                            onClick={onToggle}
                            style={{
                                display: "inline-block",
                                cursor: "pointer",
                            }}
                        >
                            {isOpen ? (
                                <IconChevronDown size={20} />
                            ) : (
                                <IconChevronRight size={20} />
                            )}
                        </span>
                    )}
                    <Text className={classes.pageName}>
                        {node.text}
                        <span className={classes.pageNameRoute}>
                            {node.data?.path}
                        </span>
                    </Text>
                </Flex>
                <Group spacing={"sm"}>
                    <ActionIcon color="green" size="sm" variant="outline" onClick={() => router.get(`${page.path}`, {}, { prefix: "live" })}>
                        <IconNavigation size={14} />
                    </ActionIcon>
                    <ActionIcon color="blue" size="sm" variant="outline" onClick={() => router.get(`${page.path}`, {}, { prefix: "cms" })}>
                        <IconEdit size={14} />
                    </ActionIcon>
                    <ActionIcon color="blue" size="sm" variant="outline" onClick={() => router.get(`${page.id}/edit`)}>
                        <IconSettings size={14} />
                    </ActionIcon>
                    <ActionIcon color="red" size="sm" variant="outline" onClick={onDelete}>
                        <IconTrash size={14} />
                    </ActionIcon>
                </Group>
            </Flex>

            <Divider />
        </div>
    );
};

export default ListItem;
