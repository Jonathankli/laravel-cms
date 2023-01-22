interface CmsObject {
    type: string;
    name: string;
    component: string;
}

interface CmsObjectGroup {
    name: string;
    objects: CmsObject[];
}