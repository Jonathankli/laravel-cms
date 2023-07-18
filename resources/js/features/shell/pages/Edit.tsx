import React from 'react';
import { GlobalObjectEditor, GlobalObjectPicker } from '../../editor';
import { EditorHeader } from '../components/EditorHeader/EditorHeader';
import { EditShellNodes } from '../components/EditShellNodes/EditShellNodes';

const EditShell = () => {
    return (
        <>
            <EditorHeader />
            <GlobalObjectPicker />
            <GlobalObjectEditor />
            <EditShellNodes />
        </>
    )
}

export default EditShell;