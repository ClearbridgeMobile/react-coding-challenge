import { instance } from "./index";

export const artworkService = {
  getData: (limit: number, offset: number, page: number) =>
    instance({
      method: "GET",
      url: `/artworks?limit=${limit}&offset=${offset}&page=${page}&fields=id,thumbnail,fiscal_year,dimensions,title,artist_display,date_display,main_reference_number`,
    }),
  getById: (id: number | string) =>
    instance({
      method: "GET",
      url: `/artworks/${id}?fields=id,thumbnail,fiscal_year,dimensions,title,artist_display,date_display,main_reference_number`,
    }),
  search: (search: string, limit: number, offset: number, page: number) =>
    instance({
      method: "GET",
      url: `/artworks/search?q=${search}&limit=${limit}&offset=${offset}&page=${page}`,
    }),
};
