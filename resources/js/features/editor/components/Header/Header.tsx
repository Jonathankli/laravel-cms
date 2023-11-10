import React from 'react';
import { AppShell, Group, Container } from '@mantine/core';
import classes from './styles.module.css';
import { PageListTrigger } from '../../../page';
import { QuickPublishButton } from '../../../publisher';

interface Headerprops {
  page: Page;
}

export function Header(props: Headerprops) {
  return (
    <AppShell.Header h={56} className={classes.header}>
      <Container className={classes.inner} >

        <Group justify='flex-start'>
          <PageListTrigger />
        </Group>

        <QuickPublishButton type='page' id={props.page.id} />

      </Container>
    </AppShell.Header>
  );
}