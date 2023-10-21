import { ThemeIcon, Tooltip } from '@mantine/core';
import { IconCheck, IconPencil, IconRefresh, IconTrash } from '@tabler/icons';
import * as React from 'react';
import { Model } from '../../pages/Show';


export const StatusIcon = (props: {model: PublishableModel | Model}) => {
    if (props.model.deleted) {
        return (
            <Tooltip label="Deleted">
                <ThemeIcon variant="light" color="red">
                    <IconTrash />
                </ThemeIcon>
            </Tooltip>
        );
    }
    switch (props.model.published) {
        case "draft":
            return (
                <Tooltip label="Draft">
                    <ThemeIcon variant="light" color="gray">
                        <IconPencil />
                    </ThemeIcon>
                </Tooltip>
            );
        case "published":
            return (
                <Tooltip label="Published">
                    <ThemeIcon variant="light" color="green">
                        <IconCheck />
                    </ThemeIcon>
                </Tooltip>
            );
        case "pending":
            return (
                <Tooltip label="Pending">
                    <ThemeIcon variant="light" color="yellow">
                        <IconRefresh />
                    </ThemeIcon>
                </Tooltip>
            );
        default:
            return null;
    }
};