import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({

    container: {
      borderRadius: theme.radius.sm,
      border: "1px solid rgba(0,0,0,0)",
      padding: "5px",
    },

    active: {
      border: "1px solid #dee2e6",
    },

  }));
  