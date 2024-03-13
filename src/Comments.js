import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const Comments = () => {
  const [data, setData] = useState({
    Name: "",
    comment: "",
  });
  const [errors, setErrors] = useState({
    Name: "",
    comment: "",
  });
  const [enable, setEnable] = useState(true);

  const enableButton = () => {
    // console.log("hi")
    if (data.Name && data.comment && !errors.Name && !errors.comment) {
      setEnable(false);
      return;
    }
    setEnable(true);
  };

  const submitForm = () => {};
  useEffect(() => {
    enableButton();
  }, [data, errors]);

  const validation = (name, value) => {
    console.log(name, value);
    value = value.trim();
    if (!value) {
      setErrors({ ...errors, [name]: "This field is required" });
      return;
    }
    setErrors({ ...errors, [name]: "" });
  };
  const updateData = (name, value) => {
    validation(name, value);
    setData({ ...data, [name]: value });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: 350,
        rowGap: 2,
      }}
    >
      <TextField
        name="Name"
        label="Name"
        placeholder="Enter your Name"
        value={data.Name}
        onChange={(e) => {
          updateData(e.target.name, e.target.value);
        }}
        error={!!errors.Name}
        helperText={errors.Name}
      />
      <TextField
        label="comment"
        name="comment"
        placeholder="Enter your comment"
        value={data.comment}
        onChange={(e) => {
          updateData(e.target.name, e.target.value);
        }}
        error={!!errors.comment}
        helperText={errors.comment}
        multiline
        rows={4}
      />
      <Button
        onClick={() => {
          submitForm();
        }}
        variant="contained"
        disabled={enable}
      >
        Post
      </Button>
    </Box>
  );
};

export default Comments;
