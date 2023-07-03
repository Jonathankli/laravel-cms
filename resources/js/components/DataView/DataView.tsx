import React from "react";
import {
    Table,
    ScrollArea,
} from "@mantine/core";

export interface Row<T> {
    selector: (column: T) => any;
    name: string;
}

interface DataViewProps<T> {
    data: T;
    headline?: string;
    rows: Row<T>[];
}

function DataView<T>(props: DataViewProps<T>) {
    const {
        data,
        rows,
    } = props;

    const tabelRows = rows.map((row, index) => (
            <tr key={index}>
                <td><b>{row.name}</b></td>
                <td>{row.selector(data)}</td>
            </tr>
    ));

    return (
        <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                <tbody>{tabelRows}</tbody>
            </Table>
        </ScrollArea>
    );
}

export default DataView;
