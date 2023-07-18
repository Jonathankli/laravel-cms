import { router } from "@inertiajs/react";
import { useMemo } from "react";
import { CmsRouter } from "../utils/CmsRouter";
import { useNode } from "../exports";
import { useServerConfig } from "./config/useServerConfig";
import { useModule } from "./useModule";

export const useRouter = () => {
    const module = useModule();
    const { paths } = useServerConfig();
    console.log(module);
    
    let node: CmsNode | null = null;
    try{
        node = useNode();
    } catch (error) { }

    return useMemo(() => new CmsRouter({node, module, paths}), [node, module, router])
}