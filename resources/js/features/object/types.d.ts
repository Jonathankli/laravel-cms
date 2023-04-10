interface StaticCmsObject {
    type: string;
    name: string;
    component: string;
}

interface CmsObject extends StaticCmsObject {
    settings: Setting[];
    data: Object;
}

interface CmsObjectGroup {
    name: string;
    objects: StaticCmsObject[];
}

interface Setting {
    type: string;
    component: string;
    title: string;
    name: string;
    metas: Object;
    default: any;
    serverValudation: boolean;
}