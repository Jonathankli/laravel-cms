import React, { useState } from 'react';
import { Header as MantineHeader, Group, Container, SegmentedControl, Center, Box, Text } from '@mantine/core';
import { IconEye, IconPencil, IconDirections } from '@tabler/icons';
import { useStyles } from './styles';
import NavigationModel from '../NavigationModel/NavigationModel';


export function NavigationTrigger() {
  const { classes } = useStyles();
  const [open, setIsOpen] = useState(false);

  const modal = open ? <NavigationModel close={setIsOpen.bind(this, false)}/> : null;

  return (
    <>
        {modal}
        <Group spacing={0} className={classes.navi} position="left" noWrap onClick={setIsOpen.bind(this, true)}>
            <IconDirections/>
            <div className={classes.navigationText}>
                <Text className={classes.navigationHeadline}>Navigation</Text>
                <Text className={classes.navigationSite}>Startseite</Text>
            </div>
        </Group>
    </>
  );
}