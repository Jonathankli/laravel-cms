import React, { useMemo, useRef } from "react";
import {
    DndProvider,
    getBackendOptions,
    MultiBackend,
    NodeModel,
    Tree,
} from "@minoru/react-dnd-treeview";
import { Divider } from "@mantine/core";
import classes from "./styles.module.css";
import ListItem from "../ListItem/ListItem";
import { useRouter } from "../../../../exports";

interface MediaTreeProps {
    media: MediaListType[];
    folders: FolderListType[];
    selectMode?: boolean;
    onSelect?(media: MediaNode): void;
    onDrop?(src?: MediaNode, target?: MediaNode): void;
    actions?(media: MediaNode): React.ReactNode;
}

export type MediaNode = NodeModel<
    | (MediaListType & { isFolder: false })
    | (FolderListType & { isFolder: true })
>;

const MediaTree = (props: MediaTreeProps) => {
    const { folders, media, selectMode = false, onSelect } = props;

    const router = useRouter();

    const treeData: MediaNode[] = useMemo(() => {
        let tree: MediaNode[] = folders.map((folder) => ({
            id: folder.id,
            parent: folder.parent_id ?? 0,
            text: folder.name,
            draggable: !selectMode,
            droppable: true,
            data: {
                ...folder,
                isFolder: true,
            },
        }));

        tree = tree.concat(
            media.map((media) => ({
                id: media.id,
                parent: media.folder_id ?? 0,
                text: media.name,
                draggable: !selectMode,
                droppable: false,
                data: {
                    ...media,
                    isFolder: false,
                },
            }))
        );

        return tree;
    }, [media, folders]);

    const ref = useRef<any>(null);

    const handleOpenAll = () => ref.current.openAll();

    return (
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <Divider />
            <Tree
                ref={ref}
                tree={treeData}
                rootId={0}
                classes={{
                    draggingSource: classes.draggingSource,
                    listItem: classes.listItem,
                    dropTarget: classes.dropTarget,
                }}
                sort={false}
                insertDroppableFirst={false}
                canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
                    if (!props.onDrop) return false;
                    if (dragSource?.parent === dropTargetId) {
                        return true;
                    }
                }}
                onDrop={(tree, { dragSource, dropTarget }) => {
                    if (!props.onDrop) return;
                    props.onDrop(dragSource, dropTarget);
                }}
                render={(node, params) => (
                    <ListItem
                        node={node}
                        selectMode={selectMode}
                        onSelect={onSelect}
                        actions={props.actions}
                        {...params}
                    />
                )}
            />
        </DndProvider>
    );
};

export default MediaTree;
