import useInertiaProps from "./inertia/useInertiaProps";

export enum CmsMode {
    LIVE = 'live',
    PREVIEW = 'preview',
    EDIT = 'edit',
}

const useCmsMode = (): CmsMode => {
    const mode = useInertiaProps()?.cmsMode as CmsMode ?? CmsMode.LIVE
    return mode;
}
 
export default useCmsMode;