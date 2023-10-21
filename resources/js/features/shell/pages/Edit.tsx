import React from 'react';
import { GlobalObjectEditor, GlobalObjectPicker } from '../../editor';
import { EditorHeader } from '../components/EditorHeader/EditorHeader';
import { EditShellNodes } from '../components/EditShellNodes/EditShellNodes';

const EditShell = (props: any) => {
    return (
        <>
            <EditorHeader shell={props.shell}/>
            <GlobalObjectPicker />
            <GlobalObjectEditor />
            <EditShellNodes />
        </>
    )
}

export default EditShell;