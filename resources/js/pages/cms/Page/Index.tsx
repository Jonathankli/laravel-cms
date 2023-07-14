import React from "react";
import { Container } from "@mantine/core";
import PageTree from "../../../features/pageTree/components/PageTree/PageTree";

const Index = (props: any) => {
    const pages = props.pages as Page[];

    return (
        <Container>
            <PageTree pages={pages} />
        </Container>
    );
};

export default Index;
