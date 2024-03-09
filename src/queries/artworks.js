import { useQuery } from "react-query";
import axios from "axios";
import { getPagedUrl } from '../utils'

const getAllArtworksFn = async (page) =>
  await axios.get(getPagedUrl(page)).then((res) => res.data);

export const useArtworkGallery = (page) =>
  useQuery({
    queryKey: ["artworks", page],
    queryFn: () => getAllArtworksFn(page),
  });


