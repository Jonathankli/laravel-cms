import React from "react";
import UserForm from "../../../components/UserForm/UserForm";
import { Container } from "@mantine/core";

interface UserIndexProps {
    plugins: Plugin[]
}

const Show = (props: UserIndexProps) => {
    return (
        <Container px={"md"} size="lg">
            <UserForm headline="Benutzer erstellen" route="/admin/users" />
        </Container>
    );
};

export default Show;
