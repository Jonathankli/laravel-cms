import React from 'react';
import { Outlet } from '../features/node';

export function Section(props) {
    return (
        <div style={{width: "100%"}}>
            Section<br/>
            <Outlet />
        </div>
    )
}