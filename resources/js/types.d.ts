type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface User {
    id?: number;
    name: string;
    email: string;
    password?: string
    permissions?: string[]
    roles?: string[]
}
