import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 56,
      maxWidth: "100vw",
  
      [theme.fn.smallerThan('sm')]: {
        justifyContent: 'flex-start',
      },
    },
  
    navi: {
      width: 260,
      border: "1px solid #dee2e6",
      borderRadius: theme.radius.md,
      padding: "5px 10px",
      cursor: "pointer",
    },

    navigationHeadline: {
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
      lineHeight: 1
    },
    navigationSite: {
      fontSize: theme.fontSizes.sm,
      color: theme.colors.blue,
      lineHeight: 1,
    },
    navigationText: {
      paddingLeft: theme.spacing.xs
    },

  }));
  