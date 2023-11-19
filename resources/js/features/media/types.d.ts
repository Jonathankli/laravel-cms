interface Folder {
    id: string;
    name: string;
    folders?: Folder[];
    media?: Media[];
    media_count?: number;
    folders_count?: number;
    parent?: Folder;
    parent_id?: string
}
interface Media {
    id: string;
    name: string;
    file_name: string;
    mime_type: string;
    title?: string;
    alt?: string;
    copy?: string;
    description?: string;
    url: string;
    thumb_url: string;
    folder?: Folder;
    folder_id?: string;
}

type MediaListType = Pick<Omit<Media, 'folder'> & {folder: FolderListType}, 'id' | 'thumb_url' | 'name' | 'file_name' | 'folder' | 'folder_id'>; 
type FolderListType = Pick<Omit<Folder, 'parent'> & {parent: FolderListType}, 'id' | 'name' | 'parent' | 'parent_id'>; 