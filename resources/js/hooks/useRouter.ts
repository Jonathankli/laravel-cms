import { router } from "@inertiajs/react";
import { useMemo } from "react";
import { CmsRouter } from "../utils/CmsRouter";
import { useNode } from "../exports";
import { useModule } from "./useModule";
import useInertiaProps from "./inertia/useInertiaProps";

export const useRouter = () => {
    const module = useModule();
    const modules = useInertiaProps().modules as any;
    
    let node: CmsNode | null = null;
    try{
        node = useNode();
    } catch (error) { }

    return useMemo(() => new CmsRouter({node, module, modules}), [node, module, router])
}