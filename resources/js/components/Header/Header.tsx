import React from 'react';
import { Header as MantineHeader, Group, Container, SegmentedControl, Center, Box, Text } from '@mantine/core';
import { IconEye, IconPencil, IconDirections } from '@tabler/icons';
import { useStyles } from './styles';
import { NavigationTrigger } from '../../features/navigation';

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
    <>
      <MantineHeader height={56}>
        <Container className={classes.inner} >

          <NavigationTrigger />

          <SegmentedControl
              data={viewControllOptions}
          />
        </Container>
      </MantineHeader>
    </>
  );
}