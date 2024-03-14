import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { artworkService } from "../../services/artworks-service";
import SearchFilter from "../../components/search";
import CircularColor from "../../components/loading";
import { artworkModel } from "../../models/artwork";
import ArtworksList from "../../components/ArtWorkList";
import Pagination from "../../components/pagination";

const ArtworksPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchOffset, setSearchOffset] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getArtworks(0);
  }, []);

  const getArtworks = async (offset: number) => {
    try {
      setLoading(true);
      const res = await artworkService.getData(10, offset, offset / 10 + 1);
      setLoading(false);
      setArtworks(res.data.data);
      setTotal(res.data.pagination.total_pages);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setLoading(false);
    }
  };

  const handleSearch = async (query: string, searchOffset: number) => {
    setSearchOffset(searchOffset);
    setSearchValue(query);
    if (!query) {
      getArtworks(0);
      return;
    }
    try {
      setLoading(true);
      const response = await artworkService.search(
        query,
        10,
        searchOffset,
        searchOffset / 10 + 1
      );
      setArtworks(response.data.data);
      setTotal(response.data.pagination.total_pages);
    } catch (error) {
      console.error("Error searching artworks:", error);
    } finally {
      setLoading(false);
    }
  };
  const currentPage = searchValue ? searchOffset / 10 + 1 : offset / 10 + 1;

  const prevPage = () => {
    if (searchValue) {
      if (searchOffset === 0) return;
      setOffset(0);
      handleSearch(searchValue, searchOffset - 10);
    } else {
      if (offset === 0) return;
      setOffset((prev) => prev - 10);
      getArtworks(offset - 10);
    }
  };

  const nextPage = () => {
    if (currentPage >= total) return;
    if (searchValue) {
      setOffset(0);
      handleSearch(searchValue, searchOffset + 10);
    } else {
      setOffset((prev) => prev + 10);
      getArtworks(offset + 10);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: { md: "20px" } }}>
      <Grid container className="mb-5">
        <Grid item xs={12} md={6}>
          <h1>Book Library</h1>
        </Grid>
        <Grid item xs={12} md={6}>
          <SearchFilter onSubmit={(query) => handleSearch(query, 0)} />
        </Grid>
      </Grid>
      {loading ? (
        <CircularColor />
      ) : (
        <>
          <ArtworksList artworks={artworks} />
          <Pagination
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={currentPage}
          />
        </>
      )}
    </Container>
  );
};

export default ArtworksPage;
