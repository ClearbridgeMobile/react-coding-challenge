import React from "react";
import GalleryTable from "./galleryTable";
import { Box, Paper, TextField } from "@mui/material";
import useArtworkGalleryInfo from "../hooks/useArtworkGalleryInfo";

const ArtworkGallery = () => {
  const {
    isLoading,
    error,
    isFetching,
    rowsPerPage,
    currentRows,
    page,
    total,
    handleChangePage,
    handleChangeRowsPerPage,
    showArtworkDetail,
    handleFilterByTitleOrCategory,
  } = useArtworkGalleryInfo();

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Box sx={{ boxShadow: 3, margin: "30px 100px 0 100px" }}>
      <TextField
        id="outlined-basic"
        label="Filter by name/category"
        variant="outlined"
        placeholder="filter by name/category..."
        onChange={handleFilterByTitleOrCategory}
        sx={{ margin: "20px 20px 20px 20px", float: "right" }}
      />
      <Paper>
        <GalleryTable
          rows={currentRows}
          rowsPerPage={rowsPerPage}
          page={page}
          total={total}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          showArtworkDetail={showArtworkDetail}
        />
        <div>{isFetching ? "Updating..." : ""}</div>
      </Paper>
    </Box>
  );
};

export default ArtworkGallery;
