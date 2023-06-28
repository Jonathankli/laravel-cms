import useInertiaProps from "./inertia/useInertiaProps";

export enum EntityType {
    PAGE = 'page',
    SHELL = 'shell',
}

const useEntityType = (): EntityType => {
    const mode = useInertiaProps()?.entityType as EntityType ?? EntityType.PAGE
    return mode;
}
 
export default useEntityType;