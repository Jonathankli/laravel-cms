import React, { useEffect, useMemo, useRef } from "react";
import {
    DndProvider,
    getBackendOptions,
    MultiBackend,
    Tree,
} from "@minoru/react-dnd-treeview";
import { Divider } from "@mantine/core";

const Index = (props: any) => {
    const pages = props.pages as Page[];

    const treeData: any = useMemo(() => {
        return pages.map((page) => ({
            id: page.id,
            parent: page.parent ?? 0,
            text: page.name,
            droppable: true,
            data: page,
        }));
    }, [pages]);

    const [state, setState] = React.useState(treeData);

    const ref = useRef<any>(null);

    const handleOpenAll = () => ref.current.openAll();

    useEffect(() => handleOpenAll(), []);

    console.log(treeData);

    return (
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <Tree
                ref={ref}
                tree={state}
                rootId={0}
                classes={{
                    root: "root",
                    container: "container",
                    listItem: "listItem",
                    dropTarget: "dropTarget",
                    draggingSource: "draggingSource",
                    placeholder: "placeholder",
                }}
                sort={false}
                dropTargetOffset={5}
                insertDroppableFirst={false}
                canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
                    if (dragSource?.parent === dropTargetId) {
                        return true;
                    }
                }}
                onDrop={(pages) => setState(pages)}
                render={(node, { depth, isOpen, onToggle }) => (
                    <div style={{ marginLeft: depth * 10 }}>
                        {node.droppable && (
                            <span onClick={onToggle}>
                                {isOpen ? "[-]" : "[+]"}
                            </span>
                        )}
                        {node.text}
                    </div>
                )}
                placeholderRender={(node, { depth }) => <Divider />}
            />
        </DndProvider>
    );
};

export default Index;
