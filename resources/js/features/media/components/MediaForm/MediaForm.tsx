import React, { useEffect, useMemo } from "react";
import {
    TextInput,
    Button,
    Checkbox,
    Group,
    Autocomplete,
    Select,
    Title,
    rem,
    Text,
    Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "../../../../exports";
import { getPreselectedParentFolder } from "../../utils/getPreselectedParentFolder";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconEdit, IconFile, IconPhoto, IconUpload, IconX } from "@tabler/icons";

interface MediaFormProps {
    media?: Media;
    folders: FolderListType[];
    onSuccess?(): void;
    onCancel?(): void;
}

const getChildren = (id: string, folders: FolderListType[]): string[] => {
    return folders.reduce((children: string[], folder: FolderListType) => {
        if (folder.parent_id === id) {
            children.push(folder.id);
            children.push(...getChildren(folder.id, folders));
        }
        return children;
    }, []);
};

export function MediaForm(props: MediaFormProps) {
    const { media, folders, onCancel, onSuccess } = props;
    const router = useRouter();

    const form = useForm<Pick<Media, 'name' | 'file_name' | 'title' | 'alt' | 'copy' | 'description' | 'folder_id'> & {file: any}>({
        initialValues: {
            name: "",
            file_name: "",
            title: "",
            alt: "",
            copy: "",
            description: "",
            folder_id: getPreselectedParentFolder(),
            file: null,
            ...(media ?? {}),
        },
    });

    const handleSubmit = (data: typeof form.values) => {
        if (media) {
            router.post(`${media.id}/patch`, data as any, {
                onSuccess: onSuccess,
                onError: form.setErrors,
                module: "media",
            });
            return;
        }
        router.post("/", data as any, {
            onSuccess: props.onSuccess,
            onError: form.setErrors,
            module: "media",
        });
    };

    useEffect(() => {
        if (media) {
            form.setValues({
                ...form.values,
                file_name: form.values.file?.name ?? form.values.file_name,
            })
            return;
        }
        form.setValues({
            ...form.values,
            file_name: form.values.file?.name ?? form.values.file_name,
            name: form.values.file?.name ?? form.values.name
        })
    }, [form.values.file])

    const ActionIcon = media ? IconEdit : IconUpload;

    const preview = media?.mime_type?.startsWith("image") || form.values.file?.type?.startsWith("image");

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Dropzone
                onDrop={(files) => form.setFieldValue('file', files[0] as any)}
                onReject={(files) => form.setFieldError('file', files[0].errors.map(e => e.message).join(', '))}
                maxSize={20 * 1024 ** 2} //20 mb
                maxFiles={1}
                style={{ background: preview ? 'rgba(0,0,0,.35)' : 'white'}}
            >
                {preview && <Image pos={"absolute"} style={{zIndex: -1, filter: "blur(3px)"}} top={0} right={0} w="100%" h="100%" src={form.values.file ? URL.createObjectURL(form.values.file) : media?.url}/>}

                <Group
                    justify="center"
                    gap="xl"
                    mih={100}
                    style={{ pointerEvents: "none" }}
                >
                    <Dropzone.Accept>
                        <ActionIcon
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-blue-6)",
                            }}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-red-6)",
                            }}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <ActionIcon
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: preview ? "white" : "var(--mantine-color-dimmed)",
                            }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="md" style={{color: preview ? "white" : "black"}} inline>
                            Drag a file here or click to select a file
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <TextInput
                {...form.getInputProps("name")}
                pt="sm"
                label="Name"
                placeholder="Name"
                data-autofocus
            />
            <TextInput
                {...form.getInputProps("file_name")}
                pt="sm"
                label="Filename"
                placeholder="Name"
                data-autofocus
            />
            <Select
                pt="sm"
                label="Parent-Folder"
                data={folders.map((folder) => ({
                    value: folder.id,
                    label: folder.name,
                }))}
                {...form.getInputProps("folder_id")}
            />
            <Title pt="md" h={2} fz={16}>
                Metadata (optional)
            </Title>
            <TextInput
                {...form.getInputProps("title")}
                pt="lg"
                label="Titel"
                placeholder="Titel"
                data-autofocus
            />
            <TextInput
                {...form.getInputProps("alt")}
                pt="sm"
                label="Alt"
                placeholder="Alt"
                data-autofocus
            />
            <TextInput
                {...form.getInputProps("copy")}
                pt="sm"
                label="Copy"
                placeholder="Copy"
                data-autofocus
            />
            <TextInput
                {...form.getInputProps("description")}
                pt="sm"
                label="Description"
                placeholder="Description"
                data-autofocus
            />
            <Group justify="space-between">
                <Button mt="md" type="submit">
                    {media ? "Update" : "Add"}
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
