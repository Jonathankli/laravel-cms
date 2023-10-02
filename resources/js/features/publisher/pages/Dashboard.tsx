import {
    Badge,
    Button,
    Card,
    Container,
    Grid,
    Group,
    Text,
    Title,
} from "@mantine/core";
import { IconRefresh, IconRocket } from "@tabler/icons";
import React from "react";
import Link from "../../../components/Link/Link";

interface DashboardProps {
    publishables: Publishable[];
}

const Index = (props: DashboardProps) => {
    return (
        <Container size={"xl"}>
            <Title>Publisher</Title>
            <Grid mt={"md"}>
                {props.publishables.map((publishable) => (
                    <Grid.Col span={6} key={publishable.type}>
                        <Publishable publishable={publishable} />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
};

const Publishable = (props: { publishable: Publishable }) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text weight={500}>{props.publishable.name}</Text>
            <Group position="apart" mt="md" mb="md" spacing={5}>
                <Badge color="green" variant="light">
                    Total: <b>{props.publishable.count}</b>
                </Badge>
                <Badge color="blue" variant="light">
                    Live: <b>{props.publishable.publishedCount}</b>
                </Badge>
                <Badge color="yellow" variant="light">
                    Pending: <b>{props.publishable.pendingCount}</b>
                </Badge>
                <Badge color="red" variant="light">
                    Delted: <b>{props.publishable.deletedCount}</b>
                </Badge>
                <Badge color="gray" variant="light">
                    Draft: <b>{props.publishable.draftCount}</b>
                </Badge>
            </Group>

            <Grid>
                <Grid.Col span={10}>
                    <Button
                        href={`/${props.publishable.type}`}
                        variant="outline"
                        fullWidth
                        radius="md"
                        component={Link}
                    >
                        Show
                    </Button>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Button
                        href={`/${props.publishable.type}`}
                        method={"post"}
                        data={{ optionals: "*" }}
                        variant="outline"
                        radius="md"
                        component={Link}
                    >
                        <IconRocket size={18} />
                    </Button>
                </Grid.Col>
            </Grid>
        </Card>
    );
};

export default Index;
