import React from 'react';
import { Outlet } from '../features/editor';

export function Section(props: any) {
    return (
        <div style={{width: "100%"}}>
            {props.node.id}<br/>
            <Outlet />
        </div>
    )
}