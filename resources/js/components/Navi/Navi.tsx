import React, { useState } from "react";
import {
    AppShell,
    UnstyledButton,
    Tooltip,
    Title,
    Burger,
    Transition,
} from "@mantine/core";
import {
    IconUser,
    IconSearch,
} from "@tabler/icons";
import { useClickOutside } from "@mantine/hooks";
import classes from "./styles.module.css";
import { spotlight } from "@mantine/spotlight";
import { Link } from '@inertiajs/react'
import useInertiaProps from "../../hooks/inertia/useInertiaProps";
import useFrontendConfig from "../../hooks/config/useFrontendConfig";
import cx from 'clsx';

const bottomLinksMockdata = [
    { icon: IconSearch, label: "Search", onClick: () => spotlight.open() },
    { icon: IconUser, label: "Account", link: "/cms/admin/account" },
];

export default function Navi() {
    const [activeLink, setActiveLink] = useState("Settings");
    const [open, setOpen] = useState(false);
    const ref = useClickOutside(() => setOpen(false));
    const modules = useInertiaProps().modules as Module[];
    const { modules: moduleConfigs } = useFrontendConfig();
    
    const mainLinks = Object.entries(modules).map(([type, module]) => {
        const config = moduleConfigs[type];
        if(!config) throw new Error("Module config not found!");
        return { icon: config.icon, label: module.name, link: module.full_slug, fullRelaod: module.type === "live_server" };
    });
    const bottomLinks = bottomLinksMockdata;

    return (
        <AppShell.Navbar w={{ sm: 56 }} ref={ref} className={classes.root}>
            <div className={classes.wrapper}>
                <div
                    className={cx(classes.aside, {
                        [classes.naviOpen]: open,
                    })}
                >
                    <div className={classes.burger}>
                        <Burger
                            opened={open}
                            onClick={setOpen.bind(this, (prev) => !prev)}
                        />
                    </div>
                    <div className={classes.mainLinks}>
                        {mainLinks.map((link) => (
                            <IconLink
                                fullRelaod={link.fullRelaod}
                                link={link}
                                open={open}
                                setActiveLink={setActiveLink}
                                activeLink={activeLink}
                                key={link.label}
                            />
                        ))}
                    </div>
                    <div>
                        {bottomLinks.map((link) => (
                            <IconLink
                                link={link}
                                open={open}
                                setActiveLink={setActiveLink}
                                activeLink={activeLink}
                                key={link.label}
                            />
                        ))}
                    </div>
                </div>
                <Transition
                    mounted={open}
                    transition="slide-right"
                    duration={250}
                >
                    {(styles) => (
                        <div style={styles} className={classes.main}>
                            <Title order={4} className={classes.title}>
                                Laravel CMS
                            </Title>
                            <div className={classes.mainLinks}>
                                {mainLinks.map((link) => (
                                    <NaviLink
                                        fullRelaod={link.fullRelaod}
                                        link={link}
                                        setActiveLink={setActiveLink}
                                        activeLink={activeLink}
                                        key={link.label}
                                    />
                                ))}
                            </div>
                            <div>
                                {bottomLinks.map((link) => (
                                    <NaviLink
                                        link={link}
                                        setActiveLink={setActiveLink}
                                        activeLink={activeLink}
                                        key={link.label}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </Transition>
            </div>
        </AppShell.Navbar>
    );
}

function NaviLink({ activeLink, setActiveLink, link, fullRelaod = false }) {
    const comp: any = fullRelaod ? "a" : Link;
    return (
        <UnstyledButton
            className={cx(classes.link, {
                [classes.linkActive]: activeLink === link.label,
            })}
            component={comp}
            href={link.link}
            onClick={(event) => {
                if(!link.onClick) return;
                event.preventDefault();
                link.onClick?.();
            }}
            key={link.label}
        >
            {link.label}
        </UnstyledButton>
    );
}

function IconLink({ link, open, setActiveLink, activeLink, fullRelaod = false }) {
    const comp: any = fullRelaod ? "a" : Link;
    const button = (
        <UnstyledButton
            className={cx(classes.mainLink, {
                [classes.mainLinkActive]: activeLink === link.label,
                [classes.mainLinkOpenActive]: activeLink === link.label && open,
            })}
            component={comp}
            href={link.link}
            onClick={(event) => {
                if(!link.onClick) return;
                event.preventDefault();
                link.onClick?.();
            }}
        >
            <link.icon size={22} stroke={1.5} />
        </UnstyledButton>
    );

    if (open) return button;

    return (
        <Tooltip label={link.label} position="right" withArrow key={link.label}>
            {button}
        </Tooltip>
    );
}
