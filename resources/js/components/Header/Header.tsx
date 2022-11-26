import React from 'react';
import { Header as MantineHeader, Group, Container, SegmentedControl, Center, Box, Text } from '@mantine/core';
import { IconEye, IconPencil, IconDirections } from '@tabler/icons';
import { useStyles } from './styles';
import NavigationModal from '../../modals/NavigationModal/NavigationModal';

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
      <NavigationModal/>
      <MantineHeader height={56}>
        <Container className={classes.inner} >

          <Group spacing={0} className={classes.navi} position="left" noWrap>
            <IconDirections/>
            <div className={classes.navigationText}>
              <Text className={classes.navigationHeadline}>Navigation</Text>
              <Text className={classes.navigationSite}>Startseite</Text>
            </div>
          </Group>

          <SegmentedControl
              data={viewControllOptions}
          />
        </Container>
      </MantineHeader>
    </>
  );
}