import React from 'react';
import { CurrentNodeTree } from '../../../features/node';
import { CurrentShell } from '../../../features/shell/live';

const ShowPage = (props: any) => {
    return (
        <CurrentShell>
            <CurrentNodeTree />
        </CurrentShell>
    )
}

export default ShowPage;