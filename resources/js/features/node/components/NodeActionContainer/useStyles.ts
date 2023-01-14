import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({

    container: {
      borderRadius: theme.radius.sm,
      border: "1px solid rgba(0,0,0,0)",
    },

    active: {
      border: "1px solid #dee2e6",
    },

  }));
  