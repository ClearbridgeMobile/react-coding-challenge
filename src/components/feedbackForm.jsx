import { Button, TextField } from "@mui/material";

const FeedbackForm = () => {
  const handleFeebackFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleFeebackFormSubmit}>
      <TextField
        sx={{ marginBottom: 3, marginTop: 5 }}
        label={"Comment"}
        placeholder="Write your comment..."
        multiline
        rows={2}
        maxRows={4}
        required
      />
      <br />
      <Button variant="contained" type="submit" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default FeedbackForm;
