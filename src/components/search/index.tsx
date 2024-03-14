import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface IProps {
  onSubmit: (value: string) => void;
}

const SearchFilter = ({ onSubmit }: IProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSubmit(searchQuery); // Trigger the search action
  };

  return (
    <form className="text-right" onSubmit={handleSubmit}>
      <TextField
        label="Search by Title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button type="submit" className="btn-search" variant="contained">
        Search
      </Button>
    </form>
  );
};

export default SearchFilter;
