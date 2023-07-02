import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    root: {
        top: 0,
        height: "100%",
    },

    wrapper: {
        display: "flex",
    },

    aside: {
        zIndex: 100,
        flex: `0 0 56px`,
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: theme.spacing.md,
        borderRight: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[3]
        }`,
    },

    main: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: theme.spacing.md,
        flex: 1,
        width: "240px",
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        position: "absolute",
        left: "56px",
        borderRight: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[3]
        }`,
        height: "100%",
    },

    naviOpen: {
        borderRight: "0px",
    },

    mainLinks: {
        flex: 1,
    },

    mainLink: {
        width: "41px",
        height: "41px",
        borderRadius: theme.radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],

    },

    mainLinkActive: {
        "&": {
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).color,
        },
    },

    mainLinkOpenActive: {
        "&::after": {
            content: '""',
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "15px",
            transform: "translateX(8px)",
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
        },
    },

    title: {
        boxSizing: "border-box",
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xs,
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        padding: theme.spacing.md,
        paddingTop: "18px",
        height: "56px",
        borderBottom: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[3]
        }`,
    },

    burger: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: theme.spacing.xs,
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        height: "56px",
        width: "100%",
        borderBottom: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[3]
        }`,
    },

    link: {
        boxSizing: "border-box",
        display: "block",
        textDecoration: "none",
        borderTopRightRadius: theme.radius.md,
        borderBottomRightRadius: theme.radius.md,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        padding: `0 ${theme.spacing.md}`,
        fontSize: theme.fontSizes.sm,
        marginRight: theme.spacing.md,
        fontWeight: 500,
        height: "41px",
        lineHeight: "41px",
    },

    linkActive: {
        "&": {
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).color,
        },
    },
}));
