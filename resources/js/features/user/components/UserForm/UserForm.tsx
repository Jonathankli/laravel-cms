import { useForm } from "@inertiajs/react";
import {
    Button,
    Grid,
    Group,
    PasswordInput,
    TextInput,
    Title,
} from "@mantine/core";
import { IconAt } from "@tabler/icons";
import React from "react";

interface UserFormProps {
    user?: User;
    headline: string;
    submitLabel?: string;
    route: string;
    method?: Method;
}

export const defaultUser: User = {
    name: "",
    email: "",
    password: "",
};

interface UserFormData extends User {
    password_confirmation: string;
}

const UserForm = (props: UserFormProps) => {
    const {
        headline,
        user = defaultUser,
        submitLabel = "Erstellen",
        route,
        method = "post",
    } = props;

    const { data, setData, submit, processing, errors } =
        useForm({
            ...defaultUser,
            ...user,
            password_confirmation: "",
        });

    return (
        <>
            <Group>
                <Title order={1} style={{ flex: 1, padding: "16px 0" }}>
                    {headline}y
                </Title>
            </Group>
            <Grid>
                <Grid.Col span={6}>
                    <TextInput
                        label="Name"
                        value={data.name}
                        onChange={(event) =>
                            setData("name", event.target.value)
                        }
                        error={errors.name}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        label="Email"
                        value={data.email}
                        onChange={(event) =>
                            setData("email", event.target.value)
                        }
                        error={errors.email}
                        leftSection={<IconAt size={14} />}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <PasswordInput
                        label="Passwort"
                        withAsterisk
                        value={data.password}
                        onChange={(event) =>
                            setData("password", event.target.value)
                        }
                        error={errors.password}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <PasswordInput
                        label="Passwort Wiederholen"
                        withAsterisk
                        value={data.password_confirmation}
                        onChange={(event) =>
                            setData("password_confirmation", event.target.value)
                        }
                        error={errors.password_confirmation}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Group justify="felx-end">
                        <Button
                            onClick={() =>
                                submit(method as any, route)
                            }
                            loading={processing}
                        >
                            {submitLabel}
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default UserForm;
