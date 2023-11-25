import React from "react";
import { RenderParams, useDragOver } from "@minoru/react-dnd-treeview";
import {
    ActionIcon,
    Button,
    Divider,
    Flex,
    Group,
    Image,
    Text,
} from "@mantine/core";
import {
    IconArrowsMaximize,
    IconEdit,
    IconFile,
    IconFolder,
    IconPlus,
    IconTrash,
} from "@tabler/icons";
import classes from "./styles.module.css";
import { useRouter } from "../../../../exports";
import { closeModal, openConfirmModal, openModal } from "@mantine/modals";
import { MediaNode } from "../MediaTree/MediaTree";
import { openMediaTypeModel } from "../../utils/mediaTypeModel";

interface ListItemProps extends RenderParams {
    node: MediaNode;
    selectMode?: boolean;
    onSelect?(media: MediaNode): void;
    actions?(media: MediaNode): React.ReactNode;
}

const ListItem = (props: ListItemProps) => {
    const { node, depth, onToggle, selectMode = false, onSelect } = props;
    const media = node.data;

    const router = useRouter();

    const dragOverProps = useDragOver(node.id, props.isOpen, props.onToggle);

    let padding = depth * 30;

    if (!media) {
        throw new Error("Media not found!");
    }

    const onClick = () => {
        if (media.isFolder) {
            onToggle();
            return;
        }
        onSelect?.(node);
    };

    return (
        <div onClick={onClick} {...dragOverProps}>
            <Flex justify={"space-between"} align={"center"}>
                <Flex
                    className={classes.nameContainer}
                    align={"center"}
                    style={{ paddingLeft: padding + "px" }}
                >
                    <div className={classes.thumbnail}>
                        {media.isFolder ? (
                            <IconFolder fill="blue" size={18} color="blue" />
                        ) : "thumb_url" in media && media.thumb_url ? (
                            <Image
                                src={media.thumb_url}
                                w={18}
                                h={18}
                                fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-file' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M14 3v4a1 1 0 0 0 1 1h4' /%3E%3Cpath d='M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z' /%3E%3C/svg%3E"
                            />
                        ) : (
                            <IconFile size={18} />
                        )}
                    </div>
                    <Text className={classes.name}>{node.text}</Text>
                </Flex>
                <Group gap={6}>
                    {props.actions?.(node)}
                </Group>
            </Flex>

            <Divider />
        </div>
    );
};

export default ListItem;
