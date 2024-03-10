import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import {
  fetchArtworks,
  selectArtwork,
  setCurrentPage,
  setSearchTerm,
} from "../../store/artWorkSlice";
import "./artwork.css";

const ArtWorkList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    artWorks,
    itemsPerPage,
    currentPage,
    totalPages,
    selectedArtwork,
    loading,
    searchTerm,
  } = useSelector((state) => state.artWorkReducer);

  useEffect(() => {
    dispatch(
      fetchArtworks({
        page: currentPage,
        search: !!searchTerm,
        term: searchTerm,
      })
    );
  }, [currentPage]);

  useEffect(() => {
    if (selectedArtwork) {
      navigate(`/art-details/${selectedArtwork}`);
    }
  }, [selectedArtwork]);

  const handlePageClick = ({ selected }) =>
    dispatch(setCurrentPage(selected + 1));

  const setSelectedArtWork = (artWorkId) => dispatch(selectArtwork(artWorkId));

  const handleSearchTextChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const performSearch = () => {
    dispatch(fetchArtworks({ page: 1, search: true, term: searchTerm }));
  };

  return (
    <>
      <div>
        <div className="search-container">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search"
            value={searchTerm}
            style={{ width: "18rem" }}
            onChange={handleSearchTextChange}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={performSearch}
          >
            Search
          </button>
        </div>
        {loading ? (
          <ClipLoader />
        ) : (
          <div>
            <div className="artwork-container">
              {artWorks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="card art-work-card"
                  style={{ width: "18rem", cursor: "pointer" }}
                  onClick={() => setSelectedArtWork(artwork.id)}
                >
                  <div>
                    <img
                      src={artwork.thumbnail?.lqip}
                      alt={artwork.title}
                      height={200}
                      className="card-img-top square-image"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{artwork.title}</h5>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-container">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                breakLinkClassName={"page-link"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                forcePage={currentPage - 1}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ArtWorkList;
