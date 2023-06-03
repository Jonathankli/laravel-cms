import { AppShell } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import * as React from 'react';
import { Header } from '../components/Header/Header';
import { GlobalObjectEditor, GlobalObjectPicker } from '../features/object';

const CmsLayout = (props) => {
    return (
        <ModalsProvider>
            <AppShell
                padding="md"
                header={<Header />}
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}
                >
                <GlobalObjectPicker />
                <GlobalObjectEditor />
                {props.children}
            </AppShell>
        </ModalsProvider>
     );
}
 
export default CmsLayout;