import {
    ActionIcon,
    Combobox,
    Drawer,
    Group,
    Image,
    Input,
    useCombobox,
} from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { IconArrowsMaximize, IconListDetails } from "@tabler/icons";
import * as React from "react";
import MediaTree from "../components/MediaTree/MediaTree";
import { ShowMedia } from "../components/ShowMedia/ShowMedia";

type ServerPayload =
    | {
          event: "search";
          searchTerm: string;
      }
    | {
          event: "mediatree";
      }
    | {
          event: "mediadetail";
          id: string;
      };

type ServerData =
    | {
          event: "search";
          results: Media[];
      }
    | {
          event: "mediatree";
          media: MediaListType[];
          folders: FolderListType[];
      }
    | {
          event: "mediadetail";
          mediaDetail: Media;
      };

export function Media(
    props: SettingProps<
        Pick<Media, "name" | "id" | "thumb_url"> | null,
        ServerPayload,
        ServerData | null
    >
) {
    const { update, requestServerData, value, data } = props;
    const [term, setTerm] = React.useState<string>("");
    const [mediaDetail, setMediaDetail] = React.useState<Media | null>(null);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const handleSearchChange = (_term: string) => {
        if (_term === term) return;
        setTerm(_term);
        requestServerData({ event: "search", searchTerm: _term }, true);
    };

    const openBrowser = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        requestServerData({ event: "mediatree" }, false);
    };

    React.useEffect(() => {
        if(data?.event === "mediadetail") {
           setMediaDetail(data.mediaDetail); 
           return;
        }
        if (data?.event === "mediatree" && data?.media && data?.folders) {
            combobox.closeDropdown();
            openModal({
                title: "Media",
                modalId: "media-browser",
                children: (
                    <MediaTree
                        media={data.media}
                        folders={data.folders}
                        selectMode={true}
                        actions={(media) => (
                            <>
                                {media.data && !media.data.isFolder && (
                                    <ActionIcon
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            requestServerData(
                                                {
                                                    event: "mediadetail",
                                                    id: media.data
                                                        ?.id as string,
                                                },
                                                false
                                            );
                                        }}
                                    >
                                        <IconArrowsMaximize size={14} />
                                    </ActionIcon>
                                )}
                            </>
                        )}
                        onSelect={(media) => {
                            if (!media.data || media.data.isFolder) return;
                            update({
                                id: media.data.id,
                                name: media.data.name,
                                thumb_url: media.data.thumb_url,
                            });
                            closeModal("media-browser");
                        }}
                    />
                ),
                size: "xl",
            });
        }
    }, [data]);

    const searchResults = data?.event === "search" ? data.results : [];

    const options = searchResults.map((item) => (
        <Combobox.Option value={item.id} key={item.id}>
            <Group justify="felx-start">
                <Image
                    src={item.thumb_url}
                    w={18}
                    h={18}
                    fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-file' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M14 3v4a1 1 0 0 0 1 1h4' /%3E%3Cpath d='M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z' /%3E%3C/svg%3E"
                />
                {item.name}
            </Group>
        </Combobox.Option>
    ));

    return (
        <>
            <Drawer
                opened={!!mediaDetail}
                onClose={() => setMediaDetail(null)}
                zIndex={2000}
            >
                {mediaDetail && <ShowMedia media={mediaDetail} />}
            </Drawer>
            <Combobox
                store={combobox}
                onOptionSubmit={(val) => {
                    const media = searchResults.find((item) => item.id === val);
                    if (!media) return;
                    update(media);
                    combobox.closeDropdown();
                }}
            >
                <Combobox.Target>
                    <Input
                        pointer
                        rightSection={
                            <ActionIcon variant="outline" onClick={openBrowser}>
                                <IconListDetails />
                            </ActionIcon>
                        }
                        onClick={() => combobox.toggleDropdown()}
                        onChange={(event) => {
                            handleSearchChange(event.currentTarget.value);
                            combobox.openDropdown();
                        }}
                        rightSectionPointerEvents="all"
                        value={combobox.dropdownOpened ? term : value?.name ?? ""}
                        leftSection={
                            <Image
                                src={value?.thumb_url}
                                w={18}
                                h={18}
                                fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-file' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M14 3v4a1 1 0 0 0 1 1h4' /%3E%3Cpath d='M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z' /%3E%3C/svg%3E"
                            />
                        }
                    />
                </Combobox.Target>

                <Combobox.Dropdown>
                    {options.length === 0 ? (
                        <Combobox.Empty>Nothing found</Combobox.Empty>
                    ) : (
                        <Combobox.Options>{options}</Combobox.Options>
                    )}
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}
