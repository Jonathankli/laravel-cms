import React from 'react';
import { Header } from '../components/Header/Header';
import { CurrentNodeTree, GlobalObjectEditor, GlobalObjectPicker } from '..';
import { ShellActionContainer } from '../../shell';
import { CurrentShell } from '../../shell/live';

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
