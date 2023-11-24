import React from "react";
import { ActionIcon, Container, Drawer, Portal } from "@mantine/core";
import { useRouter } from "../../../exports";
import MediaTree from "../components/MediaTree/MediaTree";
import { FolderForm } from "../components/FolderForm/FolderForm";
import { IconPlus } from "@tabler/icons";
import { openMediaTypeModel } from "../utils/mediaTypeModel";
import { MediaForm } from "../components/MediaForm/MediaForm";
import { ShowMedia } from "../components/ShowMedia/ShowMedia";

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
}

const Index = (props: MediaManagerIndexProps) => {
    const router = useRouter();
    console.log(props);
    
    const navigateToIndex = () => router.get('/', {}, {preserveState: true, preserveScroll: true});
    
    return (
        <Container pt={"md"}>
            <Portal target="#cms-header-portal-title">Media Manager</Portal>
            <Portal target="#cms-header-portal-right">
                <ActionIcon variant="outline" onClick={() => openMediaTypeModel(router)}>
                    <IconPlus />
                </ActionIcon>
            </Portal>
            <MediaTree folders={props.folders} media={props.medias} />
            
            {/* Create Folder */}
            <Drawer
                {...drawerBaseProps}
                title={"Create Folder"}
                opened={!!props.createFolder}
                onClose={navigateToIndex}
            >
                <FolderForm folders={props.folders} onCancel={navigateToIndex}/>
            </Drawer>

            {/* Edit Folder */}
            <Drawer
                {...drawerBaseProps}
                title={`Edit Folder ${props.folder?.name}`}
                opened={!!props.folder}
                onClose={navigateToIndex}
            >
                <FolderForm folders={props.folders} folder={props.folder} onCancel={navigateToIndex}/>
            </Drawer>

            {/* Edit Media */}
            <Drawer
                {...drawerBaseProps}
                title={`Edit Media ${props.media?.name}`}
                opened={!!props.media && !!props.editMedia}
                onClose={navigateToIndex}
            >
                <MediaForm folders={props.folders} media={props.media} onCancel={navigateToIndex} />
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
