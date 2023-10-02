interface Publishable {
    type: string;
    name: string;
    count?: number;
    publishedCount?: number;
    pendingCount?: number;
    deletedCount?: number;
    draftCount?: number;
}

interface PublishableModel {
    id: string;
    name: string;
    type: string;
    published: boolean;
}