import * as React from "react";
import { router } from "@inertiajs/react";
import {
    Accordion,
    Card,
    LoadingOverlay,
    Text,
} from "@mantine/core";
import { useEffect } from "react";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";

export interface ObjectPickerProps {
    onSelect(object: StaticCmsObject): void;
}

export function ObjectPicker(props: ObjectPickerProps) {
    const { groupedCmsObjects } = useInertiaProps();

    useEffect(() => {
        router.reload({
            only: ["groupedCmsObjects"],
            preserveState: true,
            preserveScroll: true,
        });
    }, []);

    const isLoading = !groupedCmsObjects;
    if (isLoading) {
        return <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />;
    }
    return (
        <>
            {(groupedCmsObjects as CmsObjectGroup[]).map((group) => (
                <Accordion key={group.name}>
                    <Accordion.Item value={group.name}>
                        <Accordion.Control>{group.name}</Accordion.Control>
                        <Accordion.Panel>
                            {Object.values(group.objects).map((object) => (
                                <Card key={object.type} shadow="sm" p="sm" radius="md" withBorder onClick={() => props.onSelect(object)}>
                                    <Text fw={500}>{object.name}</Text>
                                </Card>
                            ))}
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            ))}
        </>
    );
}
