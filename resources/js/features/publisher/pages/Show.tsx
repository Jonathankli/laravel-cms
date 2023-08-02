import { Title } from '@mantine/core';
import * as React from 'react';

interface ShowProps {
    publishable: Publishable;
    
}

const Show = (props: ShowProps) => {
    const { publishable } = props;
    return ( 
        <>
            <Title>Publish {publishable.type}: {publishable.name}</Title>
        </>
    );
}
 
export default Show;