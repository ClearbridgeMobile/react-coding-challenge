type pagination = {
    current_page: int,
    limit: int,
    next_url: string,
    offset: int,
    total_pages: int,
    total: int
}

type art = {
    id: string,
    title: string,
    artist_display: string,
    date_display: string,
    main_reference_number: string,
    dimensions: string,
    image_id: string,
    thubnail: string
}

type AppContextType = {
    pagination: pagination;
    setPagination: React.Dispatch<React.SetStateAction<pagination>>;
}