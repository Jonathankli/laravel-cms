import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    input: {
        pointerEvents: "none"
    },
    vaildPath: {
        borderColor: theme.colors.green
    },
    invaildPath: {
        borderColor: theme.colors.red
    },
}));
