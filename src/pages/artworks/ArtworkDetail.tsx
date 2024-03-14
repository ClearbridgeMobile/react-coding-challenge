import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { artworkService } from "../../services/artworks-service";
import ArtworkDetail from "./../../components/ArtworkDetail";
import CircularColor from "../../components/loading";
import { artworkModel } from "../../models/artwork";

const Artwork = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataById();
  }, []);

  const getDataById = async () => {
    try {
      setLoading(true);
      const res = await artworkService.getById(id as string);
      setLoading(false);
      setArtwork(res.data.data);
    } catch (error) {
      console.error("Error fetching artworks details:", error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      {loading ? <CircularColor /> : <ArtworkDetail artwork={artwork as artworkModel} />}
    </Container>
  );
};

export default Artwork;
