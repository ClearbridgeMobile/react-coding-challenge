import { Grid } from "@mui/material";
import ArtworkCard from "./../ArtworkCard";
import { artworkModel } from "../../models/artwork";
interface IProps {
  artworks: artworkModel[];
}

const ArtworksList = ({ artworks }: IProps) => {
  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
      {artworks.map((artwork: any) => (
        <Grid item key={artwork.id} xs={12} sm={6} md={6} lg={6}>
          <ArtworkCard artwork={artwork} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ArtworksList;
