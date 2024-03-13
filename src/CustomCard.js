import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Tooltip } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { DEFAULTIMAGE } from "./constants";

export default function CustomCard({ details }) {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea
        onClick={() => {
          navigate(`/inapp/${details.id}/${params.page}`);
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={
            details.thumbnail !== null ? details.thumbnail.lqip : DEFAULTIMAGE
          }
          alt="green iguana"
        />
        <CardContent>
          <Tooltip title={details.title} placement="top">
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {details.title}
            </Typography>
          </Tooltip>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
