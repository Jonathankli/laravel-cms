import {
    Accordion,
    Button,
    Checkbox,
    Container,
    Group,
    Indicator,
    Text,
    Title,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { Icon24Hours, IconRocket } from "@tabler/icons";
import * as React from "react";
import { useRouter } from "../../../exports";

interface Model {
    model: string;
    name: string;
    parent_type: string;
    parent_id: string;
    isPublished: boolean;
    isOptional: boolean;
    isSilent: boolean;
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
    rootResource: Model;
    flatTree: FaltResources;
    model: PublishableModel;
    publishIds?: string[];
}

type OptionalRefType = { [key: string]: string[] | boolean };

const Show = (props: ShowProps) => {
    const { rootResource, flatTree, model, publishable, publishIds } = props;

    const optionalRef = React.useRef<OptionalRefType>({});
    const router = useRouter();

    const submit = () => {
        router.post(`/${publishable.type}/${model.id}`, {
            optionals: Object.entries(optionalRef.current).reduce<string[]>(
                (acc, [key, value]) => {
                    if (typeof value === "boolean" && value) {
                        acc.push(key);
                    } else if (Array.isArray(value)) {
                        acc.push(...value);
                    }
                    return acc;
                },
                []
            ),
            ids: publishIds,
        });
    };

    return (
        <Container>
            <Title>
                Publish {publishable.type}: {rootResource.name}
            </Title>
            <Text my={"md"}>
                Publish the {publishable.type} {rootResource.name} to the live
                system. Please check the informations and select or deselect the
                optional data you want to publish below.
            </Text>
            <Accordion>
                {Object.values(flatTree)
                    .filter((item) => item.models.some((m) => !m.isSilent))
                    .map((item) => (
                        <Resource
                            key={item.key}
                            resource={item}
                            optionalRef={optionalRef}
                        />
                    ))}
            </Accordion>
            <Button
                variant="light"
                color="blue"
                leftIcon={<IconRocket />}
                onClick={submit}
                mt={"md"}
            >
                Publish {publishable.type}
            </Button>
        </Container>
    );
};

function Resource(props: {
    resource: Resource;
    optionalRef: React.MutableRefObject<OptionalRefType>;
}) {
    const { resource, optionalRef } = props;

    const allOptionals = React.useMemo(() => {
        return resource.models.filter((m) => m.isOptional);
    }, [resource.models]);

    const [optionals, setOptionals] = React.useState<string[]>(
        allOptionals.map((m) => m.key)
    );

    const allChecked = optionals.length === allOptionals.length;
    const indeterminate = !!optionals.length && !allChecked;

    React.useEffect(() => {
        if (!allOptionals.length) return;
        if (allChecked) {
            optionalRef.current[resource.key] = true;
            return;
        } else if (!indeterminate) {
            optionalRef.current[resource.key] = false;
            return;
        }
        optionalRef.current[resource.key] = optionals;
    }, [optionals]);

    const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOptionals(() => {
            if (!e.target.checked) {
                return [];
            }
            return allOptionals.map((m) => m.key);
        });
    };

    return (
        <Accordion.Item value={resource.key}>
            <Accordion.Control
                icon={
                    !!allOptionals.length && (
                        <Checkbox
                            onClick={(e) => e.stopPropagation()}
                            onChange={toggleAll}
                            checked={allChecked}
                            indeterminate={indeterminate}
                        />
                    )
                }
            >
                <Indicator
                    position="middle-end"
                    color={getModelStatus(resource)}
                    offset={10}
                >
                    {resource.name}
                </Indicator>
            </Accordion.Control>
            <Accordion.Panel>
                {resource.models.map((model) => (
                    <Indicator
                        key={model.key}
                        position="middle-end"
                        color={model.isPublished ? "green" : "red"}
                    >
                        {model.isOptional ? (
                            <Checkbox
                                label={model.name}
                                mt="xs"
                                ml={33}
                                checked={optionals.includes(model.key)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setOptionals((prev) => [
                                            ...prev,
                                            model.key,
                                        ]);
                                    } else {
                                        setOptionals((prev) =>
                                            prev.filter((k) => k !== model.key)
                                        );
                                    }
                                }}
                            />
                        ) : (
                            <Text mt="xs" ml={33}>
                                {model.name}
                            </Text>
                        )}
                    </Indicator>
                ))}
            </Accordion.Panel>
        </Accordion.Item>
    );
}

function getModelStatus(resource: Resource) {
    const count = resource.models.reduce((count, model) => {
        if (model.isPublished) {
            return count++;
        }
        return count;
    }, 0);

    if (count === resource.models.length) {
        return "green";
    }
    if (count === 0) {
        return "red";
    }
    return "yellow";
}

export default Show;
