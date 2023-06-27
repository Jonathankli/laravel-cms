import { AppShell } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import * as React from 'react';
import { ShellHeader } from '../components/ShellHeader/ShellHeader';
import { GlobalObjectEditor, GlobalObjectPicker } from '../features/object';

const ShellLayout = (props) => {
    return (
        <ModalsProvider>
            <AppShell
                padding="md"
                header={<ShellHeader />}
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
 
export default ShellLayout;