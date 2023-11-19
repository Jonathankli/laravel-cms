import { IconEdit, IconEye, IconTrash } from "@tabler/icons";
import React from "react";
import DataTable, { Column } from "../../../components/DataTable/DataTable";
import { Action } from "../../../hooks/useActions";
import { Button, Container, Portal } from "@mantine/core";
import { useRouter } from "../../../exports";
import MediaTree from "../components/MediaTree/MediaTree";

interface MediaManagerIndexProps {
    folders: FolderListType[];
    media: MediaListType[]; 
}

const Index = (props: MediaManagerIndexProps) => {
    const router = useRouter();
    console.log(props);
    
    return (
        <Container pt={"md"}>
            <Portal target="#cms-header-portal-title">Madia</Portal>
            <MediaTree folders={props.folders} media={props.media} />
        </Container>
    );
};

export default Index;
