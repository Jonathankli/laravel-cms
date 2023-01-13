import React from 'react';
import { Outlet } from '../features/node';

export function Section(props) {
    return (
        <div>
            Section<br/>
            <Outlet />
        </div>
    )
}