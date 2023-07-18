import React from 'react';
import { CurrentNodeTree } from '../../../features/editor';
import { ShellActionContainer } from '../../../features/shell';
import { CurrentShell } from '../../../features/shell/live';
import CmsLayout from '../../../layouts/CmsLayout';

const EditPage = (props: any) => {
    console.log(props);
    
    return (
        <CmsLayout
            navigation={props?.navigation}
        >
            <ShellActionContainer>
                <CurrentShell>
                    <CurrentNodeTree />
                </CurrentShell>
            </ShellActionContainer>
        </CmsLayout>
    )
}


export default EditPage;