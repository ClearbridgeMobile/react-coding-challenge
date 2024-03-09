import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useArtworkById } from "../queries/artworkById";
import FeedbackForm from "./feedbackForm";

const ArtworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, error, data } = useArtworkById(id);

  const handleBackNavigation = () => navigate(-1);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const {
    title,
    artist_display,
    date_display,
    main_reference_number,
    thumbnail,
    dimensions,
  } = data.data;

  return (
    <div>
      <div>
        <Card sx={{ minWidth: 275, margin: 8, boxShadow: 3, padding: 4 }}>
          <CardActions>
            <Button size="small" onClick={handleBackNavigation}>
              <ArrowBackIcon />
              Go Back
            </Button>
          </CardActions>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Title: {title}
            </Typography>
            <Typography variant="h5" component="div">
              Artist: {artist_display}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Date: {date_display}
            </Typography>
            <Typography variant="body2">
              Reference Number: {main_reference_number}
              <br />
            </Typography>
            <img
              src={thumbnail.lqip}
              height={thumbnail.height / 50}
              width={thumbnail.width / 50}
              alt={thumbnail.alt_text}
            />
            <Typography variant="body2">Dimensions: {dimensions}</Typography>
          </CardContent>
          <FeedbackForm />
        </Card>
      </div>
    </div>
  );
};

export default ArtworkDetail;
