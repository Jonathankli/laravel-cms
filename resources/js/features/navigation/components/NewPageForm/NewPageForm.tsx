import React from "react";
import { TextInput, Button, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons";
import { useStyles } from "./styles";
import { router } from "@inertiajs/react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import { usePathInfo } from "../../hooks/usePathInfo";
import { usePrefillInputs } from "../../hooks/usePrefillValues";

interface NewPageFormProps {
    pageId?: string;
    onSuccess?(): void;
}

export function NewPageForm(props: NewPageFormProps) {
    const form = useForm({
        initialValues: {
            name: "",
            path: "",
            title: "",
            use_parent_path: true,
            parent_id: props.pageId ?? null,
        },
    });
    
    const availablePathData = usePathInfo(
        form.values.path,
        form.values.use_parent_path,
        props.pageId
    );
    usePrefillInputs(form);

    const { classes, cx } = useStyles();
    const config = useServerConfig();

    const handleSubmit = (data: typeof form.values) => {
        router.post(config.paths.admin + "/pages", data, {
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
            <Button fullWidth mt="md" type="submit">
                Add
            </Button>
        </form>
    );
}