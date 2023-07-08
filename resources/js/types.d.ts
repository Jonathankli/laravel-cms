type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface User {
    id?: number;
    name: string;
    email: string;
    password?: string
    permissions?: string[]
    roles?: string[]
}

interface Module {
    type: string;
    name: string;
    slug: string
    full_slug: string;
}
