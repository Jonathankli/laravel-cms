import React from 'react';
import { Header } from '../components/Header/Header';
import { CurrentNodeTree, GlobalObjectEditor, GlobalObjectPicker } from '../../../features/editor';
import { ShellActionContainer } from '../../../features/shell';
import { CurrentShell } from '../../../features/shell/live';

const EditPage = (props: any) => {
    console.log(props);
    
    return (
        <>
            <Header page={props.page} />
            <GlobalObjectPicker />
            <GlobalObjectEditor />
            <ShellActionContainer>
                <CurrentShell>
                    <CurrentNodeTree />
                </CurrentShell>
            </ShellActionContainer>
        </>
    )
}


export default EditPage;