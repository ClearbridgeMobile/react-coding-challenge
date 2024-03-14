import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { artworkModel } from "../../models/artwork";
interface IProps {
  artwork: artworkModel;
}
const ArtworkDetail = ({ artwork }: IProps) => {
  const [email, setEmail] = useState("");
  const [author, setAuthor] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleCommentSubmit = () => {
    if (validateFields() && validateComment(comment)) {
      setIsSnackbarOpen(true);
    } else {
      setIsSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const validateEmail = (email: string) => {
    if (email.trim() === "") {
      return true; // Return true for empty email
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFields = () => {
    return (
      email.trim().length > 0 &&
      author.trim().length > 0 &&
      reviewTitle.trim().length > 0
    );
  };

  const validateComment = (comment: string) => {
    const trimmedComment = comment.trim();
    return trimmedComment.length > 0;
  };

  return (
    <>
      <Button variant="outlined" style={{ marginBottom: "10px" }}>
        <Link to={"/"}>Back</Link>
      </Button>
      <Card>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              alt={artwork?.thumbnail?.alt_text}
              height="250"
              image={artwork?.thumbnail?.lqip}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h5" component="div">
                {artwork?.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Dimensions: </strong>
                {artwork?.dimensions}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Fiscal year: </strong>
                {artwork?.fiscal_year}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Main reference number:</strong>
                {artwork?.main_reference_number}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Date display: </strong>
                {artwork?.date_display}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Artist display: </strong>
                {artwork?.artist_display}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <div style={{ marginTop: "20px" }}>
        <Typography variant="h6">Add a Comment</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginTop: "10px" }}
          error={!validateEmail(email)}
          helperText={!validateEmail(email) ? "Invalid email address" : ""}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Author's Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ marginTop: "10px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Review Title"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          style={{ marginTop: "10px" }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ marginTop: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={handleCommentSubmit}
        >
          Submit Comment
        </Button>
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={
            validateFields() && validateComment(comment) ? "success" : "error"
          }
        >
          {validateFields() && validateComment(comment)
            ? "Comment submitted successfully!"
            : "Please fill all the fields and write a comment"}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ArtworkDetail;
