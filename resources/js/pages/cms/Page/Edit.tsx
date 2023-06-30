import React from 'react';
import { CurrentNodeTree } from '../../../features/node';
import { ShellActionContainer } from '../../../features/shell';
import { CurrentShell } from '../../../features/shell/live';
import useInertiaProps from '../../../hooks/inertia/useInertiaProps';
import CmsLayout from '../../../layouts/CmsLayout';

const EditPage = (props: any) => {
    return (
        <ShellActionContainer>
            <CurrentShell>
                <CurrentNodeTree />
            </CurrentShell>
        </ShellActionContainer>
    )
}

EditPage.layout = (page) => (
    <CmsLayout
        children={page}
        navigation={page?.props?.navigation}
    />
)

export default EditPage;