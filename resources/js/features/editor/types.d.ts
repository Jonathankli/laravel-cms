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

interface StaticCmsObject {
    type: string;
    name: string;
    component: string;
}

interface CmsObject extends StaticCmsObject {
    id: string;
    settings: Setting[];
    revalidateServerData: boolean;
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
    data: any;
    serversideValidation: boolean;
    optimistic: boolean;
}

interface SettingProps<Value = any, ServerPayload = any, ServerData = any> extends Setting {
    error: string;
    data: ServerData;
    value: Value;
    update(value: Value): void;
    reset(): void;
    resetDefault(): void;
    requestServerData(payload: ServerPayload, debounce?: boolean): void;
    isLoading: boolean
}