import React, { useEffect, useState } from 'react';
import { Finder, FinderItem } from '@jkli/react-finder';
import { LoadingOverlay, Portal } from '@mantine/core';
import { useStyles } from './styles';
import { Inertia } from '@inertiajs/inertia';
import useInertiaProps from '../../../../hooks/inertia/useInertiaProps';
import { FinderItemSettings } from '@jkli/react-finder/dist/esm/types';
import { IconLocation } from '@tabler/icons';
import { parsePagesToNavi } from '../../util/parsePagesToNavi';

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
            onSuccess: (props) => setNavi(parsePagesToNavi(props.props.pages as Page[])),
            onFinish: setIsLoading.bind(this, false),
        })
    }, []);

    const itemDefaults: FinderItemSettings = {
        actions: [
            {
                Icon: IconLocation,
                name: "Wechseln",
                onClick: (item) => Inertia.visit("/cms/"+ item?.data.path, {
                    onSuccess: props.close
                })
            }
        ]
    }

    return (
        <Portal>
            <div className={classes.background} onClick={props.close}></div>
            <div className={classes.container}>
                <LoadingOverlay visible={isLoading} overlayBlur={2} />
                <Finder tree={navi} setTree={setNavi} onClose={props.close} defaultItemSettings={itemDefaults}/>
            </div>
        </Portal>
    );
}
 
export default NavigationModel;