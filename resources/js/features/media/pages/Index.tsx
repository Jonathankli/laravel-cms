import React from "react";
import { ActionIcon, Container, Drawer, Portal } from "@mantine/core";
import { useRouter } from "../../../exports";
import MediaTree, { MediaNode } from "../components/MediaTree/MediaTree";
import { FolderForm } from "../components/FolderForm/FolderForm";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons";
import { openMediaTypeModel } from "../utils/mediaTypeModel";
import { MediaForm } from "../components/MediaForm/MediaForm";
import { ShowMedia } from "../components/ShowMedia/ShowMedia";
import { openConfirmModal } from "@mantine/modals";

interface MediaManagerIndexProps {
    folders: FolderListType[];
    medias: MediaListType[];
    editFolder?: boolean;
    createFolder?: boolean;
    createMedia?: boolean;
    editMedia?: boolean;
    media?: Media;
    folder?: Folder;
}

const drawerBaseProps = {
    padding: "md",
    size: "md",
};

const Index = (props: MediaManagerIndexProps) => {
    const router = useRouter();
    console.log(props);

    const navigateToIndex = () =>
        router.get("/", {}, { preserveState: true, preserveScroll: true });

    const actions = (media: MediaNode) => {
        if (!media.data) return null;

        return (
            <>
                {media.data.isFolder && (
                    <ActionIcon
                        color="blue"
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                            e.stopPropagation();
                            openMediaTypeModel(router, media);
                        }}
                    >
                        <IconPlus size={14} />
                    </ActionIcon>
                )}
                <ActionIcon
                    color="blue"
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                        e.stopPropagation();
                        router.get(
                            `${media.data?.isFolder ? "folders/" : ""}${
                                media.data?.id
                            }/edit`,
                            {}
                        );
                    }}
                >
                    <IconEdit size={14} />
                </ActionIcon>
                <ActionIcon
                    color="red"
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                        e.stopPropagation();
                        openConfirmModal({
                            title: `${
                                media.data?.isFolder ? "Ordner" : "Datei"
                            } "${media.data?.name}" wirklich Löschen?`,
                            labels: {
                                confirm: "Löschen",
                                cancel: "Abbrechen",
                            },
                            confirmProps: { color: "red" },
                            onConfirm: () =>
                                router.delete(
                                    `${media.data?.isFolder ? "folders/" : ""}${
                                        media.data?.id
                                    }`
                                ),
                        });
                    }}
                >
                    <IconTrash size={14} />
                </ActionIcon>
            </>
        );
    };

    const onDrop = (dragSource: MediaNode, dropTarget: MediaNode) => {
        if (!dragSource?.data || !dropTarget?.data) return;
        if (dragSource.data.isFolder) {
            router.patch(
                `folders/${dragSource.data.id}`,
                {
                    parent_id: dropTarget.data.id,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
            return;
        }
        router.post(
            `${dragSource.data.id}/patch`,
            {
                folder_id: dropTarget.data.id,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <Container pt={"md"}>
            <Portal target="#cms-header-portal-title">Media Manager</Portal>
            <Portal target="#cms-header-portal-right">
                <ActionIcon
                    variant="outline"
                    onClick={() => openMediaTypeModel(router)}
                >
                    <IconPlus />
                </ActionIcon>
            </Portal>
            <MediaTree
                onSelect={(node) =>
                    router.get(`${node.data?.id}`, {}, { preserveState: true })
                }
                onDrop={onDrop}
                actions={actions}
                folders={props.folders}
                media={props.medias}
            />

            {/* Create Folder */}
            <Drawer
                {...drawerBaseProps}
                title={"Create Folder"}
                opened={!!props.createFolder}
                onClose={navigateToIndex}
            >
                <FolderForm
                    folders={props.folders}
                    onCancel={navigateToIndex}
                />
            </Drawer>

            {/* Edit Folder */}
            <Drawer
                {...drawerBaseProps}
                title={`Edit Folder ${props.folder?.name}`}
                opened={!!props.folder}
                onClose={navigateToIndex}
            >
                <FolderForm
                    folders={props.folders}
                    folder={props.folder}
                    onCancel={navigateToIndex}
                />
            </Drawer>

            {/* Edit Media */}
            <Drawer
                {...drawerBaseProps}
                title={`Edit Media ${props.media?.name}`}
                opened={!!props.media && !!props.editMedia}
                onClose={navigateToIndex}
            >
                <MediaForm
                    folders={props.folders}
                    media={props.media}
                    onCancel={navigateToIndex}
                />
            </Drawer>

            {/* Create Media */}
            <Drawer
                {...drawerBaseProps}
                title={`Create Media`}
                opened={!!props.createMedia}
                onClose={navigateToIndex}
            >
                <MediaForm folders={props.folders} onCancel={navigateToIndex} />
            </Drawer>

            {/* Show Media */}
            <Drawer
                {...drawerBaseProps}
                title={`Media: ${props.media?.name ?? ""}`}
                opened={!!props.media && !props.editMedia}
                onClose={navigateToIndex}
            >
                {props.media && <ShowMedia media={props.media} />}
            </Drawer>
        </Container>
    );
};

export default Index;
