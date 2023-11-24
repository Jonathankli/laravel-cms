import React from "react";
import {
    Image,
    Box,
    Table,
    Flex,
} from "@mantine/core";
import { IconFile } from "@tabler/icons";

interface ShowMediaProps {
    media: Media;
}

export function ShowMedia(props: ShowMediaProps) {
    const { media } = props;

    const preview = media?.mime_type?.startsWith("image");

    return (
        <div>
            <Box<"a"> component="a" style={{boxShadow: "var(--mantine-shadow-lg,none)"}} h={300} w="100%" href={media.url} target="_blank" mb="md">
                {preview 
                    ? <Image w="100%" h="100%" src={media.url} />
                    : <Flex justify={"center"} align={"center"} my="xl"><IconFile size={68}/></Flex> 
                }
            </Box>
            <Table>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>Name</Table.Td>
                        <Table.Td>{media.name}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>Filename</Table.Td>
                        <Table.Td>{media.file_name}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>Folder</Table.Td>
                        <Table.Td>{media.folder?.name}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>Mime Type</Table.Td>
                        <Table.Td>{media.mime_type}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>Title</Table.Td>
                        <Table.Td>{media.title}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>Alt</Table.Td>
                        <Table.Td>{media.alt}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>Copy</Table.Td>
                        <Table.Td>{media.copy}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>Description</Table.Td>
                        <Table.Td>{media.description}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </div>
    );
}
