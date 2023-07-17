import React, { useMemo, useState } from "react";
import { ActionIcon, Button, Drawer, Flex, Group, LoadingOverlay, Popover, ScrollArea, Table, Text, TextInput } from "@mantine/core";
import { IconDirections, IconEdit, IconSearch, IconSettings } from "@tabler/icons";
import { useStyles } from "./styles";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useRouter } from "../../../../exports";
import { useDebouncedState } from "@mantine/hooks";
import { PageForm } from "../../../page";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";

export function NavigationTrigger() {
    const { classes } = useStyles();
    const page = useInertiaProps().page as Page;
    const pages = useInertiaProps().pages as Page[] ?? [];
    const [term, setTerm] = useDebouncedState("", 200);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editPageOpen, setEditPageOpen] = useState<boolean>(false);
    const router = useRouter();
    const { params } = useServerConfig();

    const filteredPages = useMemo(() => {
      return pages.filter(page => page.name.toLowerCase().includes(term.toLowerCase()));
    }, [pages, term])

    const onOpen = () => {
        router.reload({
            only: ["pages"],
            onFinish: setIsLoading.bind(this, false),
            onBefore: setIsLoading.bind(this, true),
        });
    };

    const closePageEdit = () => {
      router.reload({
        data: {
            [params.base+"_pps"]: {
                use_parent_path: undefined,
                path: undefined,
                parent: undefined,
            } as any
        },
        onFinish: setEditPageOpen.bind(this, false),
      });
    };

    return (
      <>
        <Popover width={260} position="bottom" withArrow shadow="md" onOpen={onOpen}>
            <Popover.Target>
                <Group
                    spacing={0}
                    className={classes.navi}
                    position="left"
                    noWrap
                >
                    <IconDirections />
                    <div className={classes.navigationText}>
                        <Text className={classes.navigationHeadline}>
                            Navigation
                        </Text>
                        <Text className={classes.navigationSite}>
                            {(page as Page).name}
                        </Text>
                    </div>
                    <ActionIcon onClick={setEditPageOpen.bind(this, true)}>
                      <IconSettings color="grey" />
                    </ActionIcon>
                </Group>
            </Popover.Target>
            <Popover.Dropdown p="xs" style={{height: 400, display: "flex", flexDirection: "column"}}>
                <LoadingOverlay visible={isLoading} />
                <TextInput
                  placeholder="Suche"
                  icon={<IconSearch size={18}/>}
                  withAsterisk
                  pb={"sm"}
                  onChange={(e) => setTerm(e.target.value)}
                />
                <ScrollArea style={{flex: 1}}>
                  <Table highlightOnHover>
                      <tbody>
                        {filteredPages.map(page => (
                          <tr key={page.id} onClick={() => router.get(page.path)} style={{cursor: "pointer"}}>
                              <td>
                                <Flex>
                                  <Text style={{flex: 1, userSelect: "none"}}>{page.name}</Text>
                                  <Group>
                                    <IconEdit size={16} onClick={(e) => {
                                      e.stopPropagation();
                                      router.get(`pages/${page.id}`, {}, {
                                        prefix: "admin",
                                      })
                                    }}/>
                                  </Group>
                                </Flex>
                              </td>
                          </tr>
                        ))}
                      </tbody>
                  </Table>
                </ScrollArea>
                {!filteredPages.length && (
                  <Flex justify={"center"} align={"center"} direction={"column"}>
                    <Text>No results</Text>
                  </Flex>
                )}
            </Popover.Dropdown>
        </Popover>
        <Drawer opened={editPageOpen} onClose={closePageEdit}>
            <PageForm page={page} onCancel={closePageEdit} />
        </Drawer>
      </>
    );
}
