import React from 'react';
import { Header as MantineHeader, Group, Container } from '@mantine/core';
import { useStyles } from './styles';
import { PageListTrigger } from '../../../page';
import { QuickPublishButton } from '../../../publisher';

interface Headerprops {
  page: Page;
}

export function Header(props: Headerprops) {
  const { classes } = useStyles();

  return (
    <MantineHeader height={56} className={classes.header}>
      <Container className={classes.inner} >

        <Group position='left'>
          <PageListTrigger />
        </Group>

        <QuickPublishButton type='page' id={props.page.id} />

      </Container>
    </MantineHeader>
  );
}