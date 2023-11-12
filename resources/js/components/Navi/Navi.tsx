import React, { useState } from "react";
import {
    AppShell,
    UnstyledButton,
    Tooltip,
    Title,
    Burger,
    Transition,
    Stack,
    rem,
} from "@mantine/core";
import { IconUser, IconSearch } from "@tabler/icons";
import { useClickOutside } from "@mantine/hooks";
import classes from "./styles.module.css";
import { spotlight } from "@mantine/spotlight";
import { Link } from "@inertiajs/react";
import useInertiaProps from "../../hooks/inertia/useInertiaProps";
import useFrontendConfig from "../../hooks/config/useFrontendConfig";
import cx from "clsx";

const bottomLinksMockdata = [
    { icon: IconSearch, label: "Search", onClick: () => spotlight.open() },
    { icon: IconUser, label: "Account", link: "/cms/admin/account" },
];

export default function Navi() {
    const [activeLink, setActiveLink] = useState("Settings");
    const [open, setOpen] = useState(false);
    const modules = useInertiaProps().modules as Module[];
    const { modules: moduleConfigs } = useFrontendConfig();

    const mainLinks = Object.entries(modules).map(([type, module]) => {
        const config = moduleConfigs[type];
        if (!config) throw new Error("Module config not found!");
        return {
            icon: config.icon,
            label: module.name,
            link: module.full_slug,
            fullRelaod: module.type === "live_server",
        };
    });
    const bottomLinks = bottomLinksMockdata;

    return (
        <AppShell.Navbar className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {mainLinks.map((link) => (
                        <IconLink
                            fullRelaod={link.fullRelaod}
                            link={link}
                            activeLink={activeLink}
                            key={link.label}
                        />
                    ))}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                {bottomLinks.map((link) => (
                    <IconLink
                        link={link}
                        activeLink={activeLink}
                        key={link.label}
                    />
                ))}
            </Stack>
        </AppShell.Navbar>
    );
}

function IconLink({ link, activeLink, fullRelaod = false }) {
    const comp: any = fullRelaod ? "a" : Link;

    const onClick = (event) => {
        if (!link.onClick) return;
        event.preventDefault();
        link.onClick?.();
    };

    return (
        <Tooltip
            label={link.label}
            position="right"
            withArrow
            key={link.label}
            transitionProps={{ duration: 0 }}
        >
            <UnstyledButton
                href={link.link}
                component={comp}
                onClick={onClick}
                className={classes.link}
                data-active={activeLink === link.label ? true : undefined}
            >
                <link.icon
                    style={{ width: rem(20), height: rem(20) }}
                    stroke={1.5}
                />
            </UnstyledButton>
        </Tooltip>
    );
}
