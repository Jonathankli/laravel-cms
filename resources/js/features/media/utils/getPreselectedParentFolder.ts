export const getPreselectedParentFolder = (): string => {
    const params = new URLSearchParams(location.search);
    if(params.has('folder')) {
        return params.get('folder') ?? "";
    }
    return ""
}