import React from 'react';
import { Header as MantineHeader, Container } from '@mantine/core';
import { useStyles } from './styles';
import { BackToPageButton } from '../..';
import { QuickPublishButton } from '../../../publisher';

export function EditorHeader(props: any) {
  const { classes } = useStyles();
console.log(props);

  return (
    <MantineHeader height={56} className={classes.header}>
      <Container className={classes.inner} >

        <BackToPageButton />

        <QuickPublishButton type='shell' id={props.shell.id} />

      </Container>
    </MantineHeader>
  );
}