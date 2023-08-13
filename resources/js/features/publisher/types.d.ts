interface Publishable {
    type: string;
    name: string;
    count?: number;
    publishedCount?: number;
    pendingCount?: number;
}

interface PublishableModel {
    name: string;
    type: string;
    published: boolean;
}