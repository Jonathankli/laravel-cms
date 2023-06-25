import React from 'react';
import { CurrentNodeTree } from '../../../features/live/live';
import { CurrentShell } from '../../../features/shell/live';

const ShowPage = (props: any) => {
    return (
        <CurrentShell>
            <CurrentNodeTree />
        </CurrentShell>
    )
}

export default ShowPage;