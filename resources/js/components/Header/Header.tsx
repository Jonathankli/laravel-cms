import React from 'react';
import { Header as MantineHeader, Group, Container, Center, Box } from '@mantine/core';
import { IconEye, IconPencil } from '@tabler/icons';
import { useStyles } from './styles';
import { PublishButton } from '../../features/publisher';
import { PageListTrigger } from '../../features/page';

const viewControllOptions = [
    {
      value: 'edit',
      label: (
        <Center>
          <IconPencil size={16} />
          <Box ml={10}>Bearbeiten</Box>
        </Center>
      ),
    },
    {
      value: 'preview',
      label: (
        <Center>
          <IconEye size={16} />
          <Box ml={10}>Vorschau</Box>
        </Center>
      ),
    },
];

export function Header() {
  const { classes } = useStyles();

  return (
    <MantineHeader height={56} className={classes.header}>
      <Container className={classes.inner} >

        <Group position='left'>
          <PageListTrigger />
        </Group>

        <PublishButton />
      </Container>
    </MantineHeader>
  );
}