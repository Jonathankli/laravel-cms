import { router } from "@inertiajs/react";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect } from "react";
import { useServerConfig } from "../../../hooks/config/useServerConfig";
import useInertiaProps from "../../../hooks/inertia/useInertiaProps";

export function usePathInfo(path: string, use_parent_path: boolean, pageId?: string) {

    const [debouncedPath, setDebouncedPath] = useDebouncedState("", 400);
    const { params } = useServerConfig();

    const availablePathData = useInertiaProps().availablePathData as null | {
        path: string;
        is_available: boolean;
    };

    useEffect(() => {
        if (!debouncedPath) {
            return;
        }
        router.reload({
            data: {
                [params.base+"_pps"]: {
                    use_parent_path: use_parent_path ? 1 : 0,
                    path: debouncedPath,
                    parent: pageId,
                } as any //idk why typescript is complaining
            },
            only: ["availablePathData"],
        });
    }, [debouncedPath, use_parent_path]);

    useEffect(() => {
        setDebouncedPath(path);
    }, [path]);

    return availablePathData;
}
