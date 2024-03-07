/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import "../Styles/Styles.css";
import Home from "./Home";
import SearchResults from "./SearchResults";
import Details from "./Details";
import Context from "./Context";
import Pagination from "./Pagination";
import Comments from "./Comments";

const Display = () => {
  const {
    artDetails,
    setArtDetails,
    page,
    setPage,
    home,
    setHome,
    isSearching,
    setIsSearching,
    newData,
    setNewData,
    searchInput,
    setSearchInput,
    cardsnumbers,
    setPagenumber,
    filterBy,
    setFilterBy,
    filtered,
    setFiltered,
    homePage,
    setHomePage,
  } = useContext(Context);

  const onSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const onEnter = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };
  const onSearch = () => {
    setIsSearching(!isSearching);
    setNewData(!newData);
    setPage("search");
    setFilterBy("none");
    setFiltered(false);
  };
  const onHome = () => {
    setIsSearching(!isSearching);
    setPage("home");
    setPagenumber(1);
    setHome(true);
    setSearchInput("");
    setHomePage(!homePage);
  };
  const onFilter = (e) => {
    setNewData(!newData);
    setPage("search");
    setFilterBy(e);
    setFiltered(true);
  };

  return (
    <>
      <div className="container">
        <div className="navbarContainer">
          {isSearching && (
            <Button onClick={() => onHome()} variant="dark">
              Home
            </Button>
          )}
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            onChange={onSearchInput}
            value={searchInput}
            onKeyPress={onEnter}
          />
          <Button
            onClick={onSearch}
            disabled={searchInput !== "" ? false : true}
            variant="dark"
          >
            Search
          </Button>
          {isSearching && (
            <DropdownButton
              variant="dark"
              title={"Filter By"}
              children={
                <>
                  <Dropdown.Item onClick={() => onFilter("modern art")}>
                    Modern Art
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => onFilter("essentials")}>
                    Essentials
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => onFilter("arts of europe")}>
                    Arts of Europe
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => onFilter("prints and drawings")}
                  >
                    Prints and Drawings
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => onFilter("arts of Americas")}>
                    Arts of America
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => onFilter("photography and media")}
                  >
                    Photography and Media
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => onFilter("contemporary art")}>
                    Contemporary Art
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => onFilter("arts of africa")}>
                    Arts of Africa
                  </Dropdown.Item>
                </>
              }
            />
          )}
        </div>
      </div>

      <Home />
      {page !== "details" && <Pagination />}
      {page !== "details" && <Comments />}
    </>
  );
};

export default Display;
