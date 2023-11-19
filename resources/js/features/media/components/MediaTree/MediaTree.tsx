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

interface MediaTreeProps {
    media: MediaListType[];
    folders: FolderListType[];
}

export type MediaNode = NodeModel<(MediaListType | FolderListType) & {isFolder: boolean}>;

const MediaTree = (props: MediaTreeProps) => {
    const { folders, media } = props;

    const treeData: MediaNode[] = useMemo(() => {
        let tree: MediaNode[] = folders.map((folder) => ({
            id: folder.id,
            parent: folder.parent_id ?? 0,
            text: folder.name,
            droppable: true,
            data: {
                ...folder,
                isFolder: true
            },
        }));

        tree = tree.concat(media.map(media => ({
            id: media.id,
            parent: media.folder_id ?? 0,
            text: media.name,
            droppable: false,
            data: {
                ...media,
                isFolder: false
            },
        })))
        
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
                render={(node, params) => <ListItem node={node} {...params} />}
                placeholderRender={(node, { depth }) => <Divider />}
            />
        </DndProvider>
    );
};

export default MediaTree;
