type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface Module {
    type: string;
    name: string;
    slug: string
    full_slug: string;
}
