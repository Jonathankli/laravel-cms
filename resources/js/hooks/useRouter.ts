import { router } from "@inertiajs/react";
import { useMemo } from "react";
import { CmsRouter } from "../CmsRouter";
import { useNode } from "../exports";
import { useModule } from "./useModule";

export const useRouter = () => {
    const module = useModule();
    console.log(module);
    
    let node: CmsNode | null = null;
    try{
        node = useNode();
    } catch (error) { }

    return useMemo(() => new CmsRouter({node, module}), [node, module, router])
}