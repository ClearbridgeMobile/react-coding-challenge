/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
import Context from "./Context";
const SearchResults = () => {
  const {
    artDetails,
    setArtDetails,
    setArt,
    page,
    setPage,
    home,
    setHome,
    datas,
    setDatas,
    setTotalresults,
    cardsnumbers,
    setPagenumber,
    searchInput,
    isSearching,
    setIsSearching,
    newData,
    setNewData,
    setSearchInput,
    filterBy,
    setFilterBy,
    filtered,
    setFiltered,
  } = useContext(Context);
  const url =
    filterBy === "none"
      ? `https://api.artic.edu/api/v1/artworks/search?q=${searchInput}&limit=100`
      : `https://api.artic.edu/api/v1/artworks/search?q=${searchInput}&query[term][department_title]=${filterBy}&limit=100`;
  useEffect(() => {
    const onHome = async () => {
      try {
        const data = await axios.get(url);
        if (data) {
          setHome(false);
          setDatas(data.data.data);
          setPage("search");
          setTotalresults(data.data.data.length);
          setPagenumber(1);
        }
      } catch (err) {
        console.log(err);
      }
    };
    onHome();
  }, [home, isSearching, newData, filterBy]);
  const view = (x) => {
    setPage("details");
    setArtDetails(x);
  };
  return (
    <div>
      {filtered && (
        <h3 style={{ margin: "30px" }}>Filtering Data by {filterBy}</h3>
      )}
      {cardsnumbers.map((x, i) => (
        <div key={i} className="cardsContainer">
          <Card className="cardstyles">
            <Card.Img
              variant="top"
              src={
                x.thumbnail !== null && x.thumbnail.lqip !== null
                  ? x.thumbnail.lqip
                  : ""
              }
              className="cardimageshadows"
              style={{ width: "200px", height: "200px" }}
              onClick={() => view(x)}
            />
            <Card.Body>
              <Card.Title onClick={() => view(x)} style={{ cursor: "pointer" }}>
                {x.title}
              </Card.Title>
              {x.artist_title && <Card.Text>By: {x.artist_title}</Card.Text>}
              <div>
                <Button
                  variant="dark"
                  className="cardbuttonshadows"
                  onClick={() => view(x)}
                >
                  View Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
