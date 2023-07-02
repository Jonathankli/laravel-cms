import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    header: {
      left: 56,
    },
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

  }));
  