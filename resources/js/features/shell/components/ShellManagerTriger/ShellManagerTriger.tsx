import React from 'react';
import { Group } from '@mantine/core';
import { IconBrowser } from '@tabler/icons';
import { useStyles } from './styles';


export function ShellManagerTriger() {
  const { classes } = useStyles();

  return (
      <Group spacing={0} className={classes.navi} position="left" noWrap>
          <IconBrowser/>
      </Group>
  );
}