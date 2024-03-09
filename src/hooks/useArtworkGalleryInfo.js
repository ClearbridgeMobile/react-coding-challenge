import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useArtworkGallery } from "../queries/artworks";

const useArtworkGalleryInfo = () => {
  const [page, setPage] = useState(1);
  const { isLoading, error, data, isFetching } = useArtworkGallery(page);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentRows, setCurrentRows] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setCurrentRows(data.data);
    }
  }, [data]);

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const showArtworkDetail = (id) => {
    navigate(`/artworkDetail/${id}`);
  };

  const handleFilterByTitleOrCategory = (e) => {
    const query = e.target.value;
    if (query) {
      const regex = new RegExp(`.*${query}.*`, "i");
        // debugger;
      const filtered = data.data.filter(
        ({ title, category_titles }) =>
          regex.test(title) || regex.test(category_titles)
      );
      setCurrentRows(filtered);
    } else {
      setCurrentRows(data.data);
    }
  };

  return {
    isLoading,
    error,
    isFetching,
    rowsPerPage,
    currentRows,
    page,
    total: data?.pagination?.total || 0,
    handleChangePage,
    handleChangeRowsPerPage,
    showArtworkDetail,
    handleFilterByTitleOrCategory,
  };
};

export default useArtworkGalleryInfo;
