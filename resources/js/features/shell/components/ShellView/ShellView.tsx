import React from "react";
import { Table } from "@mantine/core";

interface ShellViewProps {
    shell: Shell;
}

export function ShellView(props: ShellViewProps) {

    const { shell } = props;

    return (
        <Table>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{shell.name}</td>
                </tr>
            </tbody>
        </Table>
    );
}