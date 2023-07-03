import { Container } from "@mantine/core";
import React from "react";
import UserForm from "../../../components/UserForm/UserForm";

interface UserIndexProps {
    user: User;
}

const Edit = (props: UserIndexProps) => {
    return (
        <Container px={"md"} size="lg">
            <UserForm
                headline={`Benutzer ${props.user.name} bearbeiten`}
                route={`/admin/users/${props.user.id}`}
                submitLabel="Aktualisieren"
                user={props.user}
                method={"patch"}
            />
        </Container>
    );
};

export default Edit;
