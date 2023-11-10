import React from 'react';
import { AppShell, Container } from '@mantine/core';
import classes from './styles.module.css';
import { BackToPageButton } from '../..';
import { QuickPublishButton } from '../../../publisher';

export function EditorHeader(props: any) {

  return (
    <AppShell.Header h={56} className={classes.header}>
      <Container className={classes.inner} >

        <BackToPageButton />

        <QuickPublishButton type='shell' id={props.shell.id} />

      </Container>
    </AppShell.Header>
  );
}