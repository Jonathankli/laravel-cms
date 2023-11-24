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
}

export type MediaNode = NodeModel<(MediaListType | FolderListType) & {isFolder: boolean}>;

const MediaTree = (props: MediaTreeProps) => {
    const { folders, media } = props;

    const router = useRouter();

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
                    draggingSource: classes.draggingSource,
                    listItem: classes.listItem,
                    dropTarget: classes.dropTarget,
                }}
                sort={false}
                insertDroppableFirst={false}
                canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
                    if (dragSource?.parent === dropTargetId) {
                        return true;
                    }
                }}
                onDrop={(tree, { dragSource, dropTarget }) => {
                    if(!dragSource?.data || !dropTarget?.data) return;
                    if(dragSource.data.isFolder) {
                        router.patch(`folders/${dragSource.data.id}`, {
                            parent_id: dropTarget.data.id,
                        }, {
                            preserveState: true,
                            preserveScroll: true,
                        });
                        return;
                    }
                    router.post(`${dragSource.data.id}/patch`, {
                        folder_id: dropTarget.data.id,
                    }, {
                        preserveState: true,
                        preserveScroll: true,
                    });
                }}
                render={(node, params) => <ListItem node={node} {...params} />}
            />
        </DndProvider>
    );
};

export default MediaTree;
