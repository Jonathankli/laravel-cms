import React, { useEffect, useState } from "react";
import { TextInput, Button, Checkbox, Text, Group } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import axios from "axios";
import { IconCheck, IconX } from "@tabler/icons";
import { useStyles } from "./styles";
import { router } from "@inertiajs/react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";

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

function usePrefillInputs<T>(form: any) {
    useEffect(() => {
        if (!form.isTouched("path")) {
            form.setFieldValue(
                "path",
                form.values.name
                    .replace(/ /g, "-")
                    .replace(/(?![A-Za-z0-9_.\-~])/g, "")
                    .toLowerCase()
            );
            form.setTouched({ path: false });
        }
        if (!form.isTouched("title")) {
            form.setFieldValue("title", form.values.name);
            form.setTouched({ title: false });
        }
    }, [form.values.name]);
}

function usePathInfo(path: string, use_parent_path: boolean, pageId?: string) {

    const [debouncedPath, setDebouncedPath] = useDebouncedState("", 400);
    const { params } = useServerConfig();

    const availablePathData = useInertiaProps().availablePathData as null | {
        path: string;
        is_available: boolean;
    };

    useEffect(() => {
        if (!debouncedPath) {
            return;
        }
        router.reload({
            data: {
                [params.base+"_pps"]: {
                    use_parent_path: use_parent_path ? 1 : 0,
                    path: debouncedPath,
                    parent: pageId,
                } as any //idk why typescript is complaining
            },
            only: ["availablePathData"],
        });
    }, [debouncedPath, use_parent_path]);

    useEffect(() => {
        setDebouncedPath(path);
    }, [path]);

    return availablePathData;
}
