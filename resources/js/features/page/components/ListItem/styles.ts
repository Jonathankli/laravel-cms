import { createStyles } from "@mantine/core";

export const useStyles = createStyles({

    pageNameContainer: {
        paddingTop: "8px",
        paddingBottom: "8px",
        width: "100%",
        maxWidth: "400px",
        borderRight: "1px solid #ced4da",
        overflow: "hidden",
    },

    pageName: {
        paddingLeft: "8px",
        lineHeight: 1.15,
        display: "inline-block",
    },

    pageNameRoute: {
        display: "block",
        fontSize: "12px",
        color: "#777",
    },

});
