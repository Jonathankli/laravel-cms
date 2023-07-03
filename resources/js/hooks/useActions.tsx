import * as React from 'react';
import { openConfirmModal } from "@mantine/modals";
import { Link, router } from '@inertiajs/react';
import { ActionIcon, Text } from '@mantine/core';

type InertiaLinkProps = React.ComponentProps<typeof Link>;

export interface Action<T> {
    route: string | InertiaLinkProps | ((item: T) => string | InertiaLinkProps);
    Icon: any;
    confirm?: boolean;
    confirmMessage?: string;
}

const openModal = (route: InertiaLinkProps, message?: string) => openConfirmModal({
    title: 'Bitte bestätigen',
    children: (
      <Text size="sm">
        {message ?? "Sind Sie sicher, dass Sie diese Aktion ausführen wollen?"}
      </Text>
    ),
    labels: { confirm: 'Bestätigen', cancel: 'Abbruch' },
    onConfirm: () => router.visit(route.href, { method: (route.method ?? "GET").toUpperCase() as any }),
});

function useActions<T>(actions: Action<T>[]) {

    const actionIcons = (item: T) => actions.map((action, index) => {
        let route = action.route;
        if(typeof route === "function") route = route(item);
        if(typeof route === "string") route = { href: route };
        const link: InertiaLinkProps = route;

        return (
            action.confirm ?
                <ActionIcon key={index} variant="default" onClick={() => openModal(link, action.confirmMessage)}>
                    <action.Icon size={16} />
                </ActionIcon>
            :
                <ActionIcon<typeof Link> component={Link} key={index} variant="default" {...route}>
                    <action.Icon size={16} />
                </ActionIcon>
        )
    });

    return actionIcons;
};

export default useActions;
