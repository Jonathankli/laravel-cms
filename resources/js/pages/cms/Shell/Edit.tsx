import React from 'react';
import { EditShellNodes } from '../../../features/shell/components/EditShellNodes/EditShellNodes';
import ShellLayout from '../../../layouts/ShellLayout';

const EditShell = (props: any) => {
    return (
        <EditShellNodes />
    )
}

EditShell.layout = (page) => (
    <ShellLayout
        children={page}
    />
)

export default EditShell;