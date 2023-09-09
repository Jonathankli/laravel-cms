import { Accordion, Checkbox, Container, Group, Title } from "@mantine/core";
import { Icon24Hours } from "@tabler/icons";
import * as React from "react";

interface Model {
    model: string;
    name: string;
    parent_type: string;
    parent_id: string;
    isPublished: boolean;
    key: string;
}
interface Resource {
    name: string;
    type: string;
    key: string;
    models: Model[];
}
interface FaltResources {
    [key: string]: Resource;
}
interface ShowProps {
    publishable: Publishable;
    flatTree: FaltResources;
}

const Show = (props: ShowProps) => {
    const { publishable, flatTree } = props;
    console.log(flatTree);

    return (
        <Container>
            <Title>
                Publish {publishable.type}: {publishable.name}
            </Title>
            <Accordion>
                {Object.values(flatTree).map((item) => (
                    <Accordion.Item value={item.key}>
                        <Accordion.Control
                            icon={
                                <Checkbox
                                    onClick={(e) => e.stopPropagation()}
                                />
                            }
                        >
                            {item.name}
                        </Accordion.Control>
                        <Accordion.Panel>
                            {item.models.map((model) => (
                                <Checkbox label={model.name} mt="xs" ml={33} />
                            ))}
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
};

export default Show;
