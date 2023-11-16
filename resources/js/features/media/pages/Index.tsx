import { IconEdit, IconEye, IconTrash } from "@tabler/icons";
import React from "react";
import DataTable, { Column } from "../../../components/DataTable/DataTable";
import { Action } from "../../../hooks/useActions";
import { Button, Container, Portal } from "@mantine/core";
import { useRouter } from "../../../exports";

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
            
        </Container>
    );
};

export default Index;
