import React, { useEffect, useState } from "react";
import { TextInput, Button, Checkbox, Text, Group } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import axios from "axios";
import { IconCheck, IconX } from "@tabler/icons";
import { useStyles } from "./styles";
import { Inertia } from "@inertiajs/inertia";

interface NewPageFormProps {
    pageId?: string;
    onSuccess?(): void
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
    const pathInfo = usePathInfo(
        form.values.path,
        form.values.use_parent_path,
        props.pageId
    );
    usePrefillInputs(form);

    const { classes, cx } = useStyles();

    const handleSubmit = (data: typeof form.values) => {
        Inertia.post("/page", data, {
            onSuccess: props.onSuccess,
            onError: form.setErrors 
        });
    }

    return (
        <form
            onSubmit={form.onSubmit(handleSubmit)}
        >
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
            {pathInfo && (
                <TextInput
                    classNames={{
                        input: cx(classes.input, {
                            [classes.vaildPath]: pathInfo.is_available,
                        }),
                    }}
                    error={!pathInfo.is_available ? "Url is already Taken" : null}
                    label="Full URL"
                    value={pathInfo.path}
                    variant="filled"
                    rightSection={
                        pathInfo.is_available ? <IconCheck /> : <IconX />
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
    const [pathInfo, setPathInfo] = useState<null | {
        path: string;
        is_available: boolean;
    }>(null);
    const [debouncedPath, setDebouncedPath] = useDebouncedState("", 400);

    useEffect(() => {
        if (!debouncedPath) {
            setPathInfo(null);
            return;
        }
        const url = "/api/pagePath/check" + (pageId ? "/" + pageId : "");
        axios
            .get(url, {
                params: {
                    use_parent_path: use_parent_path ? 1 : 0,
                    path: debouncedPath,
                },
            })
            .then((res) => {
                setPathInfo(res.data);
            });
    }, [debouncedPath, use_parent_path]);

    useEffect(() => {
        setDebouncedPath(path);
    }, [path]);

    return pathInfo;
}
