import * as React from 'react';
import useConfig from '../../hooks/config/useConfig';

export interface OutletProps {
    index?: number;
    nodeId?: string;
}

export function Outlet(props: OutletProps) {
    const OutLetComponent = useConfig().components.outlet;
    return <OutLetComponent {...props} />
}