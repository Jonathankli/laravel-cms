import React from "react";
import { TextInput, Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons";
import { useStyles } from "./styles";
import { router } from "@inertiajs/react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import { usePathInfo } from "../../hooks/usePathInfo";
import { usePrefillInputs } from "../../hooks/usePrefillValues";
import { useRouter } from "../../../../exports";

interface PageFormProps {
    page?: Page;
    parent?: string;
    onSuccess?(): void;
    onCancel?(): void;
}

export function PageForm(props: PageFormProps) {

    const {page, parent, onCancel} = props;
    const router = useRouter();

    const form = useForm({
        initialValues: {
            name: "",
            path: "",
            title: "",
            use_parent_path: true,
            parent_id: parent ?? null,
            ...(page ?? {})
        },
    });
    
    const availablePathData = usePathInfo(
        form.values.path,
        form.values.use_parent_path,
        parent
    );
    usePrefillInputs(form, !page);

    const { classes, cx } = useStyles();

    const handleSubmit = (data: typeof form.values) => {
        if(page) {
            router.patch(`/${page.id}`, data as any, {
                onSuccess: props.onSuccess,
                onError: form.setErrors,
            });
            return;    
        }
        router.post("/", data as any, {
            onSuccess: props.onSuccess,
            onError: form.setErrors,
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
            <TextInput
                {...form.getInputProps("title")}
                label="Titel"
                placeholder="Title"
                data-autofocus
            />
            <TextInput
                {...form.getInputProps("path")}
                label="Path"
                placeholder="Path"
                data-autofocus
            />
            <Checkbox
                {...form.getInputProps("use_parent_path", { type: "checkbox" })}
                mt="md"
                label="Parentpath"
            />
            {availablePathData && (
                <TextInput
                    classNames={{
                        input: cx(classes.input, {
                            [classes.vaildPath]: availablePathData.is_available,
                        }),
                    }}
                    error={
                        !availablePathData.is_available ? "Url is already Taken" : null
                    }
                    label="Full URL"
                    value={availablePathData.path}
                    variant="filled"
                    rightSection={
                        availablePathData.is_available ? <IconCheck /> : <IconX />
                    }
                />
            )}
            <Group position="apart">
                <Button mt="md" type="submit">
                    { page ? "Update" : "Add" }
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