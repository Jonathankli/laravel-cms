import React, { useMemo, useRef } from "react";
import {
    DndProvider,
    getBackendOptions,
    MultiBackend,
    NodeModel,
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
import ListItem from "../ListItem/ListItem";

interface PageTreeProps {
    pages: Page[];
}

const PageTree = (props: PageTreeProps) => {

    const { pages } = props;
    const { classes } = useStyles();

    const treeData: NodeModel<Page>[] = useMemo(() => {
        return pages.map((page) => ({
            id: page.id,
            parent: page.parent ?? 0,
            text: page.name,
            droppable: true,
            data: page,
        }));
    }, [pages]);

    const ref = useRef<any>(null);

    const handleOpenAll = () => ref.current.openAll();

    return (
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <Tree
                ref={ref}
                tree={treeData}
                rootId={0}
                classes={{
                    listItem: classes.listItem,
                    dropTarget: classes.dropTarget,
                }}
                sort={false}
                dropTargetOffset={5}
                insertDroppableFirst={false}
                canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
                    if (dragSource?.parent === dropTargetId) {
                        return true;
                    }
                }}
                onDrop={(pages) => null}
                render={(node, params) => <ListItem node={node} {...params} /> }
                placeholderRender={(node, { depth }) => <Divider />}
            />
        </DndProvider>
    );
};

export default PageTree;
