import * as React from 'react';
import { Header } from '../components/Header/Header';
import { GlobalObjectEditor, GlobalObjectPicker } from '../features/editor';

const CmsLayout = (props) => {
    return (
        <> 
            <Header />
            <GlobalObjectPicker />
            <GlobalObjectEditor />
            {props.children}
        </>
     );
}
 
export default CmsLayout;