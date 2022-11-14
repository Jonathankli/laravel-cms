import { AppShell } from '@mantine/core';
import * as React from 'react';

const CmsLayout = (props) => {
    return (
        <AppShell
            padding="md"
            // navbar={<Navigation navigation={config}/>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {props.children}
        </AppShell>
     );
}
 
export default CmsLayout;