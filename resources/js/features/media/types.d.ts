interface Folder {
    id: string;
    name: string;
    parent_id?: number;
    folders?: Folder[];
    media?: Media[];
    media_count?: number;
    folders_count?: number;
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
}

type MediaListType = Pick<Media, 'id' | 'thumb_url' | 'name' | 'file_name'>; 
type FolderListType = Pick<Folder, 'id' | 'name'>; 