const BASE_URL = "https://api.artic.edu/api/v1";

export const fetchArtworks = async (
  page = 1,
  searchTerm = "",
  category = ""
) => {
  let url = `${BASE_URL}/artworks?page=${page}&fields=id,title,artist_display,date_display,main_reference_number,dimensions,category_ids,category_titles,thumbnail&limit=10`;

  if (searchTerm) {
    url += `&q=${searchTerm}`;
  }

  const response = await fetch(url);
  let { data, pagination } = await response.json();
  return {
    artifacts: data.map((artwork) => ({
      id: artwork.id,
      title: artwork.title,
      artist_display: artwork.artist_display,
      date_display: artwork.date_display,
      main_reference_number: artwork.main_reference_number,
      thumbnail: artwork.thumbnail,
      dimensions: artwork.dimensions,
      category_ids: artwork.category_ids,
      category_titles: artwork.category_titles,
    })),
    pagination,
  };
};

export const fetchArtworkDetail = async (id) => {
  const baseUrl = "https://api.artic.edu/api/v1/artworks";
  const url = `${baseUrl}/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // The API nests the artwork's details inside the 'data' field of the response.
    return data.data;
  } catch (error) {
    console.error("Could not fetch artwork details:", error);
    return null;
  }
};
