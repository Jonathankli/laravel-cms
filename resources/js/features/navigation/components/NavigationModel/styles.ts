import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    background: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,.25)'
    },
  
    container: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      maxWidth: '900px',
      maxHeight: '600px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },

  }));
  