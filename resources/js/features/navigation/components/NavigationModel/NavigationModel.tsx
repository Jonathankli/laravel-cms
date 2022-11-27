import React, { useEffect, useState } from 'react';
import { Finder, FinderItem } from '@jkli/react-finder';
import { LoadingOverlay, Portal } from '@mantine/core';
import { useStyles } from './styles';
import { Inertia } from '@inertiajs/inertia';
import useInertiaProps from '../../../../hooks/inertia/useInertiaProps';

interface NavigationModelProps {
    close(): void
}

const NavigationModel = (props: NavigationModelProps) => {
    const [navi, setNavi] = useState<FinderItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { classes } = useStyles();
    const { pages } = useInertiaProps();

    useEffect(() => {
        if(pages) return;
        Inertia.reload({
            only: ['pages'],
            preserveState: true,
            preserveScroll: true,
            onSuccess: (props) => setNavi(props.props.pages as Page[]),
            onFinish: setIsLoading.bind(this, false),
        })
    }, []);

    return (
        <Portal>
            <div className={classes.background} onClick={props.close}></div>
            <div className={classes.container}>
                <LoadingOverlay visible={isLoading} overlayBlur={2} />
                <Finder tree={navi} setTree={setNavi} onClose={props.close}/>
            </div>
        </Portal>
    );
}
 
export default NavigationModel;