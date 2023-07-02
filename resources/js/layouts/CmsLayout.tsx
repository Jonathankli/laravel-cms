import { ModalsProvider } from '@mantine/modals';
import * as React from 'react';
import { Header } from '../components/Header/Header';
import { GlobalObjectEditor, GlobalObjectPicker } from '../features/object';

const CmsLayout = (props) => {
    return (
        <ModalsProvider> 
            <Header />
            <GlobalObjectPicker />
            <GlobalObjectEditor />
            {props.children}
        </ModalsProvider>
     );
}
 
export default CmsLayout;