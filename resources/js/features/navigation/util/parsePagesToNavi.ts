import { FinderItem } from "@jkli/react-finder";

export function parsePagesToNavi(pages: Page[]): FinderItem[] {
    return pages.map(page => ({
        id: page.id,
        name: page.name,
        parent: page.parent,
        data: page
    }))
}