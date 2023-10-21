import { ThemeIcon, Tooltip } from '@mantine/core';
import { IconCheck, IconPencil, IconRefresh, IconRocket, IconTrash } from '@tabler/icons';
import * as React from 'react';
import { Model } from '../../pages/Show';
import Link from '../../../../components/Link/Link';

interface QuickPublishButtonProps {
    type: string;
    id: string;
}

export const QuickPublishButton = (props: QuickPublishButtonProps) => {
    return (
        <Link
            module='publisher'
            href={`/${props.type}/${props.id}`}
        >
            <Tooltip label="Publish">
                <ThemeIcon variant="light" color="blue" size="xl">
                    <IconRocket />
                </ThemeIcon>
            </Tooltip>
        </Link>
    );
};