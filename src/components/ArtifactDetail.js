import React, { useState, useEffect } from "react";
import { Descriptions, Button } from "antd";
import { useParams, Link } from "react-router-dom";
import { fetchArtworkDetail } from "../services/ApiService"; // Assume this is your API call function

const ArtifactDetail = () => {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);

  useEffect(() => {
    const loadArtifactDetail = async () => {
      const data = await fetchArtworkDetail(id);
      setArtifact(data);
    };

    loadArtifactDetail();
  }, [id]);

  if (!artifact) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{artifact.title}</h1>
      <Descriptions
        title="Artifact Info"
        extra={
          <Button type="primary">
            <Link to={`/`}>Back</Link>
          </Button>
        }
        bordered
        items={[
          {
            key: "1",
            label: "Artist",
            children: artifact.artist_display.split("\n").join(", "),
          },
          {
            key: "2",
            label: "Date of Creation",
            children: artifact.date_display,
          },
          {
            key: "3",
            label: "Main Reference Number",
            children: artifact.main_reference_number,
          },
          {
            key: "4",
            label: "Dimensions",
            children: artifact.dimensions,
          },
        ]}
      />

      {/* Image Path obtained from: https://api.artic.edu/docs/#iiif-image-api */}
      <h5>Thumbnail:</h5>
      <img
        src={`https://www.artic.edu/iiif/2/${artifact.image_id}/full/843,/0/default.jpg`}
        alt={artifact?.thumbnail?.alt_text}
      />
    </div>
  );
};

export default ArtifactDetail;
