interface CmsNode {
    id: string;
    type: string;
    component: string;
    index: number;
    outlet: number;
    parent?: string;
}