import React, { useEffect, useMemo } from "react";
import { TextInput, Button, Checkbox, Group, Autocomplete, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "../../../../exports";

interface FolderFormProps {
    folder?: Folder;
    folders: FolderListType[];
    onSuccess?(): void;
    onCancel?(): void;
}

const getChildren = (id: string, folders: FolderListType[]): string[] => {
    return folders.reduce((children: string[], folder: FolderListType) => {
        if(folder.parent_id === id) {
            children.push(folder.id);
            children.push(...getChildren(folder.id, folders))
        }
        return children;
    }, [])
}

const getPreselectedParent = () => {
    const params = new URLSearchParams(location.search);
    if(params.has('folder')) {
        return params.get('folder');
    }
    return ""
}

export function FolderForm(props: FolderFormProps) {

    const {folder, folders, onCancel, onSuccess} = props;
    const router = useRouter();

    const form = useForm({
        initialValues: {
            name: "",
            parent_id: getPreselectedParent(),
            ...(folder ?? {}),
        },
    });

    const foldersWithoutChildren = useMemo(() => {
        if(!folder) {
            return folders;
        }
        const children = getChildren(folder.id, folders);
        console.log(children, folders);
        
        return folders.filter(f => !children.includes(f.id) && f.id !== folder.id)
    }, [folders, folder])

    const handleSubmit = (data: typeof form.values) => {
        if(folder) {
            router.patch(`/folders/${folder.id}`, data as any, {
                onSuccess: onSuccess,
                onError: form.setErrors,
                module: "media"
            });
            return;    
        }
        router.post("/folders", data as any, {
            onSuccess: props.onSuccess,
            onError: form.setErrors,
            module: "media",
        });
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                {...form.getInputProps("name")}
                label="Pagename"
                placeholder="Name"
                data-autofocus
            />
            <Select 
                pt="sm"
                label="Parent-Folder"
                data={foldersWithoutChildren.map(folder => ({value: folder.id, label: folder.name}))}
                {...form.getInputProps("parent_id")}
            />
            <Group justify="space-between">
                <Button mt="md" type="submit">
                    { folder ? "Update" : "Add" }
                </Button>
                {onCancel && (
                    <Button mt="md" onClick={onCancel} variant="outline">
                        Cancel
                    </Button>
                )}
            </Group>
        </form>
    );
}