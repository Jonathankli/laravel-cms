import React from 'react';
import { Header as MantineHeader, Group, Container } from '@mantine/core';
import { useStyles } from './styles';
import { PageListTrigger } from '../../../page';

export function Header() {
  const { classes } = useStyles();

  return (
    <MantineHeader height={56} className={classes.header}>
      <Container className={classes.inner} >

        <Group position='left'>
          <PageListTrigger />
        </Group>

      </Container>
    </MantineHeader>
  );
}