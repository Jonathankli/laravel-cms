import * as React from 'react';
import { closeModal, openModal } from "@mantine/modals";
import { Button, Group } from '@mantine/core';

export const openMediaTypeModel = (router, media: any = null) => {
    openModal({
        title: "Was möchten Sie erstellen?",
        modalId: "mediaTypeSelector",
        children: (
            <Group grow >
                <Button
                    onClick={() =>
                        router.get(
                            `create`,
                            { folder: media?.id },
                            {
                                preserveState: true,
                                onFinish: () =>
                                    closeModal("mediaTypeSelector"),
                            }
                        )
                    }
                >
                    Datei
                </Button>
                <Button
                    variant='outline'
                    onClick={() =>
                        router.get(
                            `folders/create`,
                            { folder: media?.id },
                            {
                                preserveState: true,
                                onFinish: () =>
                                    closeModal("mediaTypeSelector"),
                            }
                        )
                    }
                >
                    Ordner
                </Button>
            </Group>
        ),
    });
};