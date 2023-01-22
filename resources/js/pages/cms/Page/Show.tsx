import { usePage } from '@inertiajs/inertia-react';
import { Button } from '@mantine/core';
import React, { useState } from 'react';
import { CurrentNodeTree } from '../../../features/node';
import { ObjectPicker } from '../../../features/objectEditor';
import { ObjectPickerModal } from '../../../features/objectEditor/components/ObjectPickerModal/ObjectPickerModal';

const ShowPage = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <ObjectPickerModal isOpen={isOpen} onClose={setIsOpen.bind(this, false)} onSelect={console.log}/>
            <Button onClick={setIsOpen.bind(this, true)}>Test</Button>
            <CurrentNodeTree />
        </>
    )
}

export default ShowPage;