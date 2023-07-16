import React from "react";
import { Table } from "@mantine/core";

interface PageViewProps {
    page: Page;
}

export function PageView(props: PageViewProps) {

    const { page } = props;

    return (
        <Table>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{page.name}</td>
                </tr>
                <tr>
                    <td>Path</td>
                    <td>{page.path}</td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>{page.title}</td>
                </tr>
                <tr>
                    <td>Parent</td>
                    <td>{page.parent?.name ?? "---"}</td>
                </tr>
                <tr>
                    <td>Created At</td>
                    <td>{page.created_at}</td>
                </tr>
                <tr>
                    <td>Updated At</td>
                    <td>{page.updated_at}</td>
                </tr>

            </tbody>
        </Table>
    );
}