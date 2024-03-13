import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomCard from "./CustomCard";
import axios from "axios";
import { URL1 } from "./constants";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Gallery = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const params = useParams();
  const naviagte = useNavigate();
  const [searchKey, setSearchKey] = React.useState("");

  const searchFilter = (value) => {
    setSearchData(
      data.filter((art) =>
        art.title.toLowerCase().includes(value.toLowerCase())
      )
    );
    console.log(searchData);
  };
  const handleSearch = (e) => {
    searchFilter(e.target.value);
    setSearchKey(e.target.value);
  };

  // console.log(params.page)
  const navigatorFun = (add) => {
    // console.log(add)
    naviagte(
      `/app/${
        parseInt(params.page) + add < 1 ? 1 : parseInt(params.page) + add
      }`
    );
  };
  useEffect(() => {
    getCards();
  }, [params]);
  const getCards = async () => {
    try {
      let page = params.page ? params.page : 0;
      const response = await axios.get(URL1 + page);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          value={searchKey}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 200 }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        {searchData.length > 0 ? (
          searchData.map((art) => <CustomCard key={art.id} details={art} />)
        ) : searchKey.length > 0 ? (
          <h1>No elements found</h1>
        ) : (
          data.map((art) => <CustomCard key={art.id} details={art} />)
        )}
      </Box>
      {searchKey.length > 0 ? (
        <></>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mx: 3,
          }}
        >
          <Button
            variant="contained"
            disabled={params.page < 2 ? true : false}
            onClick={() => {
              navigatorFun(-1);
            }}
          >
            prev page
          </Button>
          <Typography variant="body1">{`Page ${params.page} of 100`}</Typography>
          <Button
            variant="contained"
            disabled={params.page > 99 ? true : false}
            onClick={() => {
              navigatorFun(1);
            }}
          >
            next page
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Gallery;
