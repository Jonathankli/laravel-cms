import React from "react";
import { ShellHeader } from "../components/ShellHeader/ShellHeader";
import { GlobalObjectEditor, GlobalObjectPicker } from "../features/object";

const ShellLayout = (props) => {
    return (
        <>
            <ShellHeader />
            <GlobalObjectPicker />
            <GlobalObjectEditor />
            {props.children}
        </>
    );
};

export default ShellLayout;
