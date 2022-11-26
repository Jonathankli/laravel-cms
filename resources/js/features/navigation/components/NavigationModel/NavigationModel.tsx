import React, { useState } from 'react';
import { Finder, FinderItem } from '@jkli/react-finder';
import { Portal } from '@mantine/core';
import { useStyles } from './styles';

interface NavigationModelProps {
    pages: Page[]
    close(): void
}

const NavigationModel = (props: NavigationModelProps) => {
    const [navi, setNavi] = useState<FinderItem[]>(props.pages);
    const { classes } = useStyles();

    return (
        <Portal>
            <div className={classes.background} onClick={props.close}></div>
            <div className={classes.container}>
                <Finder tree={navi} setTree={setNavi} onClose={props.close}/>
            </div>
        </Portal>
    );
}
 
export default NavigationModel;