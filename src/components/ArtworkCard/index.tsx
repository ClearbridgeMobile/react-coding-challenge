import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions } from "@mui/material";
interface IProps {
  artwork :()=>void
}
const ArtworkCard = ({ artwork }:any) => {
  return (
    <Card>
      <CardActionArea>
        <Link to={`/book/${artwork.id}`}>
          <CardMedia
            component="img"
            height="140"
            image={artwork.thumbnail?.lqip}
            alt={artwork.thumbnail?.alt_text}
          />
        </Link>
        <CardContent>
          <Typography gutterBottom component="div">
            <Link to={`/book/${artwork.id}`}>{artwork.title}</Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong> Dimension: </strong>
            {artwork.dimensions}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Fiscal year: </strong>
            {artwork.fiscal_year}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArtworkCard;
