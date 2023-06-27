import React from 'react';
import { CurrentNodeTree } from '../../../features/node';
import { CurrentShell } from '../../../features/shell/live';
import useInertiaProps from '../../../hooks/inertia/useInertiaProps';
import CmsLayout from '../../../layouts/CmsLayout';

const EditPage = (props: any) => {
    return (
        <CurrentShell>
            <CurrentNodeTree />
        </CurrentShell>
    )
}

EditPage.layout = (page) => (
    <CmsLayout
        children={page}
        navigation={page?.props?.navigation}
    />
)

export default EditPage;