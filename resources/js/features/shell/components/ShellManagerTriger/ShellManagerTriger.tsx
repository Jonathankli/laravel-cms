import React from 'react';
import { Group } from '@mantine/core';
import { IconBrowser } from '@tabler/icons';
import { useStyles } from './styles';
import { ShellManager } from '../ShellManager/ShellManager';


export function ShellManagerTriger() {
  const { classes } = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <ShellManager open={open} close={() => setOpen(false)}/>
      <Group spacing={0} className={classes.navi} position="left" noWrap onClick={() => setOpen(prev => !prev)}>
          <IconBrowser/>
      </Group>
    </>
  );
}