/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, ReactDOM } from "react";
import { Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
import "../Styles/Styles.css";
import axios from "axios";
import Context from "./Context";
import Details from "./Details";
import SearchResults from "./SearchResults";
import Pagination from "./Pagination";
const Home = () => {
  const url = "https://api.artic.edu/api/v1/artworks?page=1&limit=100";

  const {
    setArtDetails,
    page,
    setPage,
    home,
    setHome,
    setDatas,
    setTotalresults,
    cardsnumbers,
    setPagenumber,
    isSearching,
    setIsSearching,
    newData,
    setNewData,
    searchInput,
    setSearchInput,
    homePage,
    setHomePage,
  } = useContext(Context);
  const view = (x) => {
    setPage("details");
    setArtDetails(x);
  };
  useEffect(() => {
    const onHome = async () => {
      try {
        const data = await axios.get(url);
        if (data) {
          setHome(true);
          setDatas(data.data.data);
          setPage("home");
          setTotalresults(data.data.data.length);
          setPagenumber(1);
        }
      } catch (err) {
        console.log(err);
      }
    };
    onHome();
  }, [homePage]);

  return (
    <div>
      {home &&
        cardsnumbers.map((x, i) => (
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
                <Card.Title
                  onClick={() => view(x)}
                  style={{ cursor: "pointer" }}
                >
                  {x.title.length > 15 ? x.title.slice(0, 34) + `...` : x.title}
                </Card.Title>
                <Card.Text>By: {x.artist_title}</Card.Text>
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

      {page === "details" && <Details />}
      {page === "search" && <SearchResults />}
    </div>
  );
};

export default Home;
