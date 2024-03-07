/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import "../Styles/Styles.css";
import { Button } from "react-bootstrap";
import Context from "./Context";

const Details = () => {
  const renderHTML = (rawHTML) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });

  const { artDetails, setArtDetails, page, setPage, home, setHome } =
    useContext(Context);
  const onBack = () => {
    setPage("home");
    setHome(true);
  };
  useEffect(() => {
    setHome(false);
  }, []);
  const imageUrl =
    artDetails &&
    `https://www.artic.edu/iiif/2/${artDetails.image_id}/full/843,/0/default.jpg`;

  return (
    <div>
      <div style={{ margin: "50px" }} className="mainDetailsContainer">
        <div className="detailsContent">
          {" "}
          {artDetails && (
            <img
              src={imageUrl}
              className="detailsImage"
              alt="Poster not found in database"
            />
          )}
        </div>
        <div className="detailTitle">
          {" "}
          <h2>{artDetails && artDetails.title}</h2>
        </div>
        <div className="detailsContainer">
          <div>
            <div className="detailsContent">
              {" "}
              <strong> Artist </strong>:{" "}
              {artDetails && renderHTML(artDetails.artist_display)}
            </div>
            <div>
              <strong> Description: </strong>{" "}
              {artDetails && renderHTML(artDetails.description)}
            </div>

            <div className="detailsContent">
              {" "}
              <strong> Date display :</strong>{" "}
              {artDetails && renderHTML(artDetails.date_display)}
            </div>
            <div className="detailsContent">
              {" "}
              <strong>Reference Number </strong>:{" "}
              {artDetails && renderHTML(artDetails.main_reference_number)}
            </div>
            <div className="detailsContent">
              {" "}
              <strong> Dimensions </strong>:{" "}
              {artDetails && renderHTML(artDetails.dimensions)}
            </div>
          </div>
        </div>
        <div className="detailsContent">
          <Button onClick={() => onBack()} variant="dark">
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Details;
