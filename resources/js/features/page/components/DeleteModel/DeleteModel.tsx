import React, { useEffect, useMemo } from "react";
import { Button, Group, Select, Switch, Table, Text } from "@mantine/core";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";
import { useRouter } from "../../../../exports";
import { closeModal } from "@mantine/modals";

interface DeleteModelProps {
    page: Page;
    hasChildren: boolean;
    close: () => void;
}

const deleteMethodes = Object.freeze({
    newparent: "newparent",
    delete: "delete",
});

const optionen = [
    {
        value: deleteMethodes.newparent,
        label: "Unterseiten neuer Seite zuordnen.",
    },
    { value: deleteMethodes.delete, label: "Unterseiten löschen." },
];

const pagesWithoutSubTreeOf = (flatPageTree: Page[], page: Page | Page[]) => {
    const pages = Array.isArray(page) ? page : [page];

    if(!pages.length) return flatPageTree;

    return pagesWithoutSubTreeOf(
        flatPageTree.filter((p) => !pages.some((page) => page.id === p.id)),
        flatPageTree.filter((p) => pages.some((page) => page.id === p.parent_id))
    );
}

export function DeleteModel(props: DeleteModelProps) {
    const { page, hasChildren, close } = props;
    const pages = (useInertiaProps().pages as Page[]) ?? [];
    const router = useRouter();

    const [value, setValue] = React.useState<string | null>(deleteMethodes.newparent);
    const [newPage, setNewPage] = React.useState<string | null>("");
    const [keepPath, setkeepPath] = React.useState<boolean>(true);

    useEffect(() => {
        router.reload({
            only: ["pages"],
            onSuccess: () => {
                const page = pages.find((p) => p.id === props.page.parent_id);
                if (!page) return;
                setNewPage(page.id);
            }
        });
    }, []);

    const pageOptions = useMemo(() => {
        const filteredPages = pagesWithoutSubTreeOf(pages, page);
        const options = filteredPages.map((page) => ({
            label: page.name,
            value: page.id,
        }));

        options.unshift({
            label: "Root",
            value: "",
        });

        return options;
    }, [pages]);

    const onDelete = () => {
        router.delete(`${page.id}`, {
            data: {
                method: value,
                newParent: value === deleteMethodes.newparent ? newPage : null,
                keepPath: value !== deleteMethodes.delete ? keepPath : null,
            },
            onSuccess: () => {
                closeModal("delete-page");
            },
        });
    }

    return (
        <>
            <Text mb={"xl"} size={"xs"}>
                {hasChildren
                    ? "Diese Seite hat noch Unterseiten. Was soll mit diesen geschehen?"
                    : "Soll diese Seite wirklich gelöscht werden?"}
            </Text>
            {hasChildren && (
                <>
                    <Select
                        value={value}
                        onChange={setValue}
                        label="Aktion wählen"
                        data={optionen}
                        mb={"xl"}
                    />
                    <Select
                        value={newPage}
                        onChange={setNewPage}
                        disabled={value !== deleteMethodes.newparent}
                        label="Neue Übergeordnete Seite"
                        data={pageOptions}
                        mb={"xl"}
                    />
                    <Switch
                        checked={keepPath}
                        onChange={e => setkeepPath(e.currentTarget.checked)}
                        disabled={value === deleteMethodes.delete}
                        defaultChecked
                        label="Unterseitenpfad beibehalten"
                        mb={"xl"}
                    />
                </>
            )}
            <Group justify="space-between">
                <Button onClick={close} variant="outline">Abrechen</Button>
                <Button color="red" variant="filled" onClick={onDelete}>
                    Löschen
                </Button>
            </Group>
        </>
    );
}
