interface User {
    id?: number;
    name: string;
    email: string;
    password?: string
    permissions?: string[]
    roles?: string[]
}