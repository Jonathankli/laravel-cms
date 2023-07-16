interface CmsNode {
    id: string;
    type: string;
    component: string;
    settings: Object;
    data: Object;
    index: number;
    outlet: number;
    parent_id?: string;
}