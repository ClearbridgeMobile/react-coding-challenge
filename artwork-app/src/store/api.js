import axios from "axios";

export const fetchArtworksService = async (params) => {
  return await axios.get(
    `https://api.artic.edu/api/v1/artworks?page=${params.page}&limit=10`
  );
};

export const fetchArtworkDetailsService = async (params) => {
  return await axios.get(`https://api.artic.edu/api/v1/artworks/${params.id}`);
};

export const searchArtWorks = async (params) => {
  const searchJson = {
    query: {
      query_string: {
        fields: ["title"],
        query: params.term,
      },
    },
  };

  const encodedQuery = encodeURIComponent(JSON.stringify(searchJson));
  return await axios.get(
    `https://api.artic.edu/api/v1/artworks/search?page=${params.page}&params=${encodedQuery}`
  );
};
