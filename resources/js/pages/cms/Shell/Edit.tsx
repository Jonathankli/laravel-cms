import React from 'react';
import { EditShellNodes } from '../../../features/shell/components/EditShellNodes/EditShellNodes';
import ShellLayout from '../../../layouts/ShellLayout';

const EditShell = (props: any) => {
    return (
        <ShellLayout>
            <EditShellNodes />
        </ShellLayout>
    )
}

export default EditShell;