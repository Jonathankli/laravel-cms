import React from "react";
import {
    NodeModel,
    RenderParams,
} from "@minoru/react-dnd-treeview";
import {
    ActionIcon,
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
    IconPlus,
    IconSettings,
    IconTrash,
} from "@tabler/icons";
import { useStyles } from "./styles";
import { useRouter } from "../../../../exports";
import { closeModal, openModal } from "@mantine/modals";
import { DeleteModel } from "../DeleteModel/DeleteModel";

interface ListItemProps extends RenderParams {
    node: NodeModel<Page>;
    pages: Page[];
}

const ListItem = (props: ListItemProps) => {
    const { node, hasChild, depth, isOpen, onToggle, pages } = props;
    const page = node.data;
    
    const { classes } = useStyles();
    const router = useRouter();

    let padding = depth * 30;
    if (!hasChild) padding += 20;

    if(!page) {
        throw new Error("Page not found");
    }

    const onDelete = () => {
        openModal({
            modalId: "delete-page",
            title: "Seite löschen?",
            children: <DeleteModel close={closeModal.bind(this, "delete-page")} page={page} hasChildren={pages.some(p => p.parent_id === page.id)} />,
        })
    }

    return (
        <div onClick={() => router.get(`${page.id}`, {}, { preserveState: true })}>
            <Flex justify={"space-between"} align={"center"}>
                <Flex
                    className={classes.pageNameContainer}
                    align={"center"}
                    style={{ paddingLeft: padding + "px" }}
                >
                    {hasChild && (
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggle();
                            }}
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
                <Group spacing={6}>
                    <ActionIcon color="green" size="sm" variant="outline" onClick={(e) => {
                        e.stopPropagation();
                        router.get(`${page.path}`, {}, { module: "live" })
                    }}>
                        <IconNavigation size={14} />
                    </ActionIcon>
                    <ActionIcon color="blue" size="sm" variant="outline" onClick={(e) => {
                        e.stopPropagation();
                        router.get(`${page.path}`, {}, { module: "cms" })
                    }}>
                        <IconEdit size={14} />
                    </ActionIcon>
                    <ActionIcon color="blue" size="sm" variant="outline" onClick={(e) => {
                        e.stopPropagation();
                        router.get(`${page.id}/edit`, {}, { preserveState: true })
                    }}>
                        <IconSettings size={14} />
                    </ActionIcon>
                    <ActionIcon color="blue" size="sm" variant="outline" onClick={(e) => {
                        e.stopPropagation();
                        router.get(`${page.id}/create`, {}, { preserveState: true })
                    }}>
                        <IconPlus size={14} />
                    </ActionIcon>
                    <ActionIcon color="red" size="sm" variant="outline" onClick={(e) => {
                        e.stopPropagation();
                        onDelete()
                    }}>
                        <IconTrash size={14} />
                    </ActionIcon>
                </Group>
            </Flex>

            <Divider />
        </div>
    );
};

export default ListItem;
