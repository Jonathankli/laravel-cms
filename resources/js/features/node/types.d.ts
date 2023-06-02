interface CmsNode {
    id: string;
    type: string;
    component: string;
    settings: Object;
    index: number;
    outlet: number;
    parent?: string;
}