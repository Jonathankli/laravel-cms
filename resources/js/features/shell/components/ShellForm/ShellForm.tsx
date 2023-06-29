import React from "react";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { router } from "@inertiajs/react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";

interface ShellFormProps {
    onSuccess?(): void;
    shell?: Shell;
}

export function ShellForm(props: ShellFormProps) {

    const form = useForm({
        initialValues: {
            name: props.shell?.name ?? "",
        },
    });

    const config = useServerConfig();

    const handleSubmit = (data: typeof form.values) => {
        router.visit(config.paths.admin + "/shells" + (props.shell ? "/"+props.shell.id : ""), {
            data,
            method: (props.shell ? 'patch' : 'post') as any,
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
            <Button fullWidth mt="md" type="submit">
                {props.shell ? "Update" : "Add"}
            </Button>
        </form>
    );
}