import React, { useState } from 'react';
import { Group, Text } from '@mantine/core';
import { IconDirections } from '@tabler/icons';
import { useStyles } from './styles';
import NavigationModel from '../NavigationModel/NavigationModel';
import useInertiaProps from '../../../../hooks/inertia/useInertiaProps';


export function NavigationTrigger() {
  const { classes } = useStyles();
  const [open, setIsOpen] = useState(false);
  const { page } = useInertiaProps();

  const modal = open ? <NavigationModel close={setIsOpen.bind(this, false)}/> : null;

  return (
    <>
        {modal}
        <Group spacing={0} className={classes.navi} position="left" noWrap onClick={setIsOpen.bind(this, true)}>
            <IconDirections/>
            <div className={classes.navigationText}>
                <Text className={classes.navigationHeadline}>Navigation</Text>
                <Text className={classes.navigationSite}>{(page as Page).name}</Text>
            </div>
        </Group>
    </>
  );
}