import React, { useEffect, useMemo, useState } from "react";
import { Flex, Group, LoadingOverlay, ScrollArea, Table, Text, TextInput } from "@mantine/core";
import { IconEdit, IconSearch } from "@tabler/icons";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useRouter } from "../../../../exports";
import { useDebouncedState } from "@mantine/hooks";

export function PageList() {
    const pages = useInertiaProps().pages as Page[] ?? [];
    const [term, setTerm] = useDebouncedState("", 200);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const filteredPages = useMemo(() => {
      return pages.filter(page => page.name.toLowerCase().includes(term.toLowerCase()));
    }, [pages, term])

    useEffect(() => {
        router.reload({
            only: ["pages"],
            onFinish: setIsLoading.bind(this, false),
            onBefore: setIsLoading.bind(this, true),
        });
    }, []);

    return (
      <>
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
      </>
    );
}
