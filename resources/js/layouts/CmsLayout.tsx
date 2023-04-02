import { AppShell } from '@mantine/core';
import * as React from 'react';
import { Header } from '../components/Header/Header';
import { GlobalObjectPicker } from '../features/objectPicker';

const CmsLayout = (props) => {
    return (
        <AppShell
            padding="md"
            header={<Header />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            <GlobalObjectPicker />
            {props.children}
        </AppShell>
     );
}
 
export default CmsLayout;