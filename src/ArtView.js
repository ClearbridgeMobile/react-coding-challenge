import {
  Box,
  Button,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DEFAULTIMAGE, URL2 } from "./constants";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const ArtView = () => {
  const rowItems = [
    "title",
    "artist_display",
    "date_display",
    "main_reference_number",
    "dimensions",
  ];
  const [data, setData] = useState({});
  const params = useParams();
  const naviagte = useNavigate();

  useEffect(() => {
    getIndvidualCard();
  }, []);
  const getIndvidualCard = async () => {
    try {
      const response = await axios.get(URL2 + params.id);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    Object.keys(data).length > 0 && (
      <Box>
        <Button
          variant="contained"
          style={{
            marginTop: 3,
            marginBottom: 3,
          }}
          onClick={() => {
            naviagte(`/app/${params.page}`);
          }}
        >
          {" "}
          <ArrowBack /> Go Back{" "}
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CardMedia
            sx={{ width: 400, height: 200 }}
            component="img"
            image={data.thumbnail !== null ? data.thumbnail.lqip : DEFAULTIMAGE}
            alt="green iguana"
          />
          <Typography sx={{ width: "50%", textAlign: "center" }} variant="h5">
            Details
          </Typography>
        </Box>
        <Table sx={{ width: "50%", borderBottom: "none" }} align="center">
          <TableBody sx={{ textAlign: "center" }}>
            {data &&
              rowItems.map((item) => (
                <TableRow key={item + item} sx={{ borderBottom: "none" }}>
                  <TableCell
                    key={item}
                    align="right"
                    sx={{ width: "50%", fontWeight: "800" }}
                  >{`${item}  :`}</TableCell>
                  <TableCell
                    key={data[item]}
                    align="left"
                    sx={{ width: "50%", fontWeight: "800" }}
                  >
                    {data[item]}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    )
  );
};

export default ArtView;
