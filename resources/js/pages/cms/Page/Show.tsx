import React from 'react';
import { CurrentNodeTree } from '../../../features/node';

const ShowPage = (props: any) => {
    return (
        <>
            {JSON.stringify(props)}
            <h1>Page!!!!</h1>
            <CurrentNodeTree />
        </>
    )
}

export default ShowPage;