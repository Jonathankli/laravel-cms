import React, { useState } from "react";
import { ActionIcon, Drawer, Group, Popover, Text } from "@mantine/core";
import { IconDirections, IconSettings } from "@tabler/icons";
import { useStyles } from "./styles";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useRouter } from "../../../../exports";
import { PageForm } from "../..";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import { PageList } from "../PageList/PageList";

export function PageListTrigger() {
    const { classes } = useStyles();
    const page = useInertiaProps().page as Page;
    const [editPageOpen, setEditPageOpen] = useState<boolean>(false);
    const router = useRouter();
    const { params } = useServerConfig();

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
        <Popover width={260} position="bottom" withArrow shadow="md">
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
                <PageList />
            </Popover.Dropdown>
        </Popover>
        <Drawer opened={editPageOpen} onClose={closePageEdit}>
            <PageForm page={page} onCancel={closePageEdit} onSuccess={closePageEdit}/>
        </Drawer>
      </>
    );
}
