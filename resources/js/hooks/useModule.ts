import { usePage } from "@inertiajs/react";
import useInertiaProps from "./inertia/useInertiaProps";


export const useModule = () => {
    const modules = useInertiaProps().modules as Module[] ?? [];
    const page = usePage();
    if(!modules || !Object.keys(modules).length || !page) return null;

    const [moduleType, path] = page.component.split("::");
    if(!path) return null;

    const module = modules[moduleType];
    if(!module) return null;

    return module;
}