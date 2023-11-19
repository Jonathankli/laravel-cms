import React from "react";
import { ActionIcon, Container, Drawer, Portal } from "@mantine/core";
import { useRouter } from "../../../exports";
import MediaTree from "../components/MediaTree/MediaTree";
import { FolderForm } from "../components/FolderForm/FolderForm";
import { IconPlus } from "@tabler/icons";
import { openMediaTypeModel } from "../utils/mediaTypeModel";

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

            {/* Edit Folder */}
            <Drawer
                {...drawerBaseProps}
                title={`Edit Media ${props.media?.name}`}
                opened={!!props.media}
                onClose={navigateToIndex}
            >
                
            </Drawer>

            {/* Create Media */}
            <Drawer
                {...drawerBaseProps}
                title={`Create Media`}
                opened={!!props.createMedia}
                onClose={navigateToIndex}
            >
                
            </Drawer>

        </Container>
    );
};

export default Index;
