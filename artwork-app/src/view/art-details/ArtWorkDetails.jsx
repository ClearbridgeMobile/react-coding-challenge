import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtWorkDetails, selectArtwork } from "../../store/artWorkSlice";
import { useParams } from "react-router-dom";
import "./art-details.css";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const ArtWorkDetails = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const art = useSelector(
    (state) => state.artWorkReducer.selectedArtWorkDetails
  );
  const { loading } = useSelector((state) => state.artWorkReducer);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchArtWorkDetails({ id }));
  }, []);

  const goBack = () => {
    dispatch(selectArtwork(undefined));
    navigate("/");
  };
  return (
    <>
      {loading ? (
        <ClipLoader />
      ) : (
        <div>
          <div className="back-button">
            <button type="button" className="btn btn-primary" onClick={goBack}>
              Back
            </button>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2>{art?.title}</h2>
                <p>
                  <strong>Artist:</strong> {art?.artist_display}
                </p>
                <p>
                  <strong>Date:</strong> {art?.date_display}
                </p>
                <p>
                  <strong>Main Reference Number:</strong>{" "}
                  {art?.main_reference_number}
                </p>
                <p>
                  <strong>Dimensions:</strong> {art?.thumbnail?.width} x{" "}
                  {art?.thumbnail?.height}
                </p>
              </div>
              <div className="col-md-6">
                <img
                  src={art?.thumbnail?.lqip}
                  height={"200"}
                  alt={art?.title}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtWorkDetails;
