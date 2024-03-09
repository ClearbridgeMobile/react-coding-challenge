import { useQuery } from "react-query";
import axios from "axios";

const getArtworkByIdFn = async (id) =>
  await axios.get(`https://api.artic.edu/api/v1/artworks/${id}`).then((res) => res.data);

export const useArtworkById = (id) =>
  useQuery({
    queryKey: ["artworks", id],
    queryFn: () => getArtworkByIdFn(id),
  });


