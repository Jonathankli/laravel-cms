import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

const useFilter = () => {
    const params = new URLSearchParams(location.search);
    const search = useRef(params.get("search"));
    const [searchState, setSearch] = useState(search.current ?? '');
    const sortBy = useRef(params.get("sort"));
    const page = useRef(Number.parseInt(params.get("page") ?? "1"));
    const reverseSortDirection = useRef(params.get("sortDirection") === "desc");

    const updateSorting = (field: string) => {
        const reversed =
            field === sortBy.current ? !reverseSortDirection.current : false;
        router.get(
            location.pathname + buildQuery(field, reversed, search.current, page.current)
        );
    };

    const submitSearch = () => {
        router.get(
            location.pathname +
                buildQuery(sortBy.current, reverseSortDirection.current, searchState, page.current)
        );
    };

    const buildQuery = (
        sortBy: string | null,
        reverseSortDirection: boolean,
        search: string | null,
        page: number
    ) => {
        const params = new URLSearchParams();
        search && params.append("search", search);
        sortBy && params.append("sort", sortBy);
        page && page != 1 && params.append("page", page.toString());
        reverseSortDirection && params.append("sortDirection", "desc");
        if (params.toString() == "") return "";
        return "?" + params.toString();
    };

    const switchPage = (page: number) => {
        router.get(
            location.pathname +
                buildQuery(sortBy.current, reverseSortDirection.current, searchState, page)
        );
    };

    return {
        updateSorting,
        submitSearch,
        sortBy: sortBy.current,
        reverseSortDirection: reverseSortDirection.current,
        search: searchState,
        setSearch,
        switchPage,
        page: page.current
    };
};

export default useFilter;
